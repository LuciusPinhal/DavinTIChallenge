const express = require('express');
const createDatabaseConnection = require('./database');
const config = require('./config');
const bodyParser = require('body-parser'); 

const app = express();
const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];
const db = createDatabaseConnection(dbConfig);

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json()); 

// Rota GET para obter todos os contatos
app.get('/api/contacts', (req, res) => {
    const query = 'SELECT id, nome, idade FROM Contato';

    db.query(query, (error, result) => {
        if (error) {
            console.error('Erro ao obter contatos:', error);
            res.status(500).json({ error: 'Erro ao obter contatos' });
        } else {
            res.json(result.rows);
        }
    });
});

app.get('/api/phone/:idContato', (req, res) => {
    const idContato = req.params.idContato;

    const query = 'SELECT id, numero FROM Telefone WHERE idContato = $1';
    const values = [idContato];

    db.query(query, values, (error, result) => {
        if (error) {
            console.error('Erro ao obter telefones:', error);
            res.status(500).json({ error: 'Erro ao obter telefones' });
        } else {         
            res.json(result.rows);
        }
    });
});

// Rota POST para adicionar um novo contato
app.post('/api/create/contact', (req, res) => {
    const novoContato = req.body;
    const query = 'INSERT INTO Contato (nome, idade) VALUES ($1, $2)';
    const values = [novoContato.nome, novoContato.idade];

    db.query(query, values, (error, result) => {
        if (error) {
            console.error('Erro ao adicionar novo contato:', error);
            res.status(500).json({ error: 'Erro ao adicionar novo contato' });
        } else {
            res.json({ message: 'Contato adicionado com sucesso' });
        }
    });
});


//Post Phone
app.post('/api/create/phone/:idContato', (req, res) => {
    const idContato = req.params.idContato;
    const numero = req.body.numero; 
    if (!numero) {
        res.status(400).json({ error: 'Número do telefone é obrigatório' });
        return;
    }
    const query = 'INSERT INTO Telefone (idContato, numero) VALUES ($1, $2)';
    const values = [idContato, numero];

    db.query(query, values, (error, result) => {
        if (error) {
            console.error('Erro ao adicionar telefone:', error);
            res.status(500).json({ error: 'Erro ao adicionar telefone' });
        } else {
            res.json({ message: 'Telefone adicionado com sucesso' });
        }
    });
});

// Rota PUT para editar um contato existente
app.put('/api/edit/contact/:id', (req, res) => {
    const idContato = req.params.id;
    const novosDados = req.body;
    const query = 'UPDATE Contato SET nome = $1, idade = $2 WHERE id = $3';
    const values = [novosDados.nome, novosDados.idade, idContato];
    db.query(query, values, (error, result) => {
        if (error) {
            console.error('Erro ao editar contato:', error);
            res.status(500).json({ error: 'Erro ao editar contato' });
        } else {
            res.json({ message: 'Contato editado com sucesso' });
        }
    });
});

//Put Phone
app.put('/api/edit/phone/:id', (req, res) => {
    const idTelefone = req.params.id;
    const novoNumero = req.body.numero; 
    
    if (!novoNumero) {
        res.status(400).json({ error: 'Novo número de telefone é obrigatório' });
        return;
    }

    const query = 'UPDATE Telefone SET numero = $1 WHERE id = $2';
    const values = [novoNumero, idTelefone];

    db.query(query, values, (error, result) => {
        if (error) {
            console.error('Erro ao atualizar telefone:', error);
            res.status(500).json({ error: 'Erro ao atualizar telefone' });
        } else {
            res.json({ message: 'Telefone atualizado com sucesso' });
        }
    });
});


//DELETE contact
app.delete('/api/delete/contact/:id', (req, res) => {
    const idContato = req.params.id;

    const query = 'DELETE FROM Contato WHERE id = $1';
    const values = [idContato];

    db.query(query, values, (error, result) => {
        if (error) {
            console.error('Erro ao excluir contato:', error);
            res.status(500).json({ error: 'Erro ao excluir contato' });
        } else {
            res.json({ message: 'Contato excluído com sucesso' });
        }
    });
});

//DELETE phone
app.delete('/api/delete/phone/:id', (req, res) => {
    const idTelefone = req.params.id;

    const query = 'DELETE FROM Telefone WHERE id = $1';
    const values = [idTelefone];

    
    db.query(query, values, (error, result) => {
        if (error) {
            console.error('Erro ao excluir telefone:', error);
            res.status(500).json({ error: 'Erro ao excluir telefone' });
        } else {
            res.json({ message: 'Telefone excluído com sucesso' });
        }
    });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
