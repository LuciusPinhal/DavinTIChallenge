# Instruções para Criação do Banco de Dados **DavinTI**

Para criar o banco de dados com o nome **DavinTI** e incluir as tabelas **Contato** e **Telefone**, siga os passos abaixo:

---

## 1. Criar o Banco de Dados **DavinTI**

Execute o seguinte comando SQL para criar o banco de dados:

```sql
CREATE DATABASE DavinTI;


-- Conectando ao banco de dados DavinTI
\c DavinTI

-- Criando a tabela Contato
CREATE TABLE Contato (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL
);

-- Criando a tabela Telefone
CREATE TABLE Telefone (
    id SERIAL PRIMARY KEY,
    idContato INT REFERENCES Contato(id) ON DELETE CASCADE,
    numero VARCHAR(15) NOT NULL
);