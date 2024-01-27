<template>
    <div class="ModalFront">
      <button @click="showModal" class="open-modal-button-create">Create Contato</button>
      <MenssageSuccess :msg="msgS" v-show="msgS" />
      
      <div class="modal" :class="{ 'modal-visible': modalVisible }">
        <MessageError :msg="msg" v-show="msg" />
        <div class="modal-content">
          <span @click="hideModal" class="close-modal-button">&times;</span>
          <h2>Adicionar Contato</h2>
          <form class="bodyModal" @submit.prevent="addContacts">
            <div class="inputModal">
                <input v-model="novoContato.nome" type="text" placeholder="Nome" class="modal-input">
                <input v-model="novoContato.idade" type="number" placeholder="Idade" class="modal-input">
            </div>
            <div class="ButtonModal">
                <div @click="hideModal" class="modal-button cancel-button">Cancelar</div>
                <button type="submit" class="modal-button">Adicionar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Mediator from "../service/Mediator";
  import MessageError from "../MessageError.vue"
  import MenssageSuccess from "../MessageSuccess.vue"
  export default {
    data() {
      return {
        novoContato: { nome: '', idade: '' },
        modalVisible: false,
        msg: null,
        msgS: null,
      };
    },
    components:{
      MessageError,
      MenssageSuccess
    },
    methods: {
      async addContacts() {
        try {
          await axios.post('http://localhost:3000/api/create/contact', this.novoContato);
          this.novoContato = { nome: '', idade: '' };

          this.msgS = 'Contato criado com sucesso!';
          setTimeout(() => (this.msgS = ''), 3000);

          Mediator.notify(true, "reloadScreen");
          this.hideModal(); 
        } catch (error) {
          this.msg = 'Erro ao adicionar contato';
          setTimeout(() => (this.msg = ''), 3000);
          console.error('Erro ao adicionar contato:', error);
        }
      },

      showModal() {
        this.modalVisible = true; 
      },
      hideModal() {
        this.modalVisible = false; 
      }
    },
    created() {
        Mediator.notify(this, "initCreateContact");
    },
  };
  </script>
  
  <style scoped>
.ModalFront{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}
  .modal {
    display: none;
    position: fixed; 
    z-index: 1; 
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto; 
    background-color: rgba(0,0,0,0.4); 
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 14% auto;
    padding: 20px 20px 0 20px;
    border: 1px solid #888;
    height: 300px;
    width: 400px; 
  }
  
  .close-modal-button {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close-modal-button:hover,
  .close-modal-button:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  
  .open-modal-button-create {
    width: 120px;
    height: 40px;
    background-color: #007bff;
    color: #fff;
    border: 2px solid #007bff;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.5s;
  }
  .open-modal-button-create:hover {
    background-color: #005cbe;
    color: #cccccc;
  }
  .bodyModal{
    height: 100%;
    width: 98%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .inputModal{
    width: 100%;
  }
  .ButtonModal{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  
  /* Exibe o modal quando modalVisible é true */
  .modal-visible {
    display: block;
  }
  
  /* Estilos para os inputs */
  .modal-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  /* Estilos para o botão */
  .modal-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 20px;
    margin-top: 30px;
}

  
  .modal-button:hover {
    opacity: 0.5;
  }
  .cancel-button{
    background-color: #a60202;;
    
  }
  .cancel-button:hover{
    background-color: #88213c;
  }
  </style>
  