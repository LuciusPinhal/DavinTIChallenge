<template>
    <div class="">
      <button @click="showModal" class="open-modal-button">
        <Icon icon="mdi:edit" class="formTableIcon"  />
      </button>
      
        <div class="modal" :class="{ 'modal-visible': modalVisible }">
          <div class="modal-content">
            <span @click="hideModal" class="close-modal-button">&times;</span>
            <h2>Editar Contato</h2>
          <form class="bodyModal" @submit.prevent="EditContacts">
            <div class="inputModal">
                <input v-model="novoContato.nome" type="text" placeholder="Nome" class="modal-input">
                <input v-model="novoContato.idade" type="number" placeholder="Idade" class="modal-input">
            </div>
            <div class="ButtonModal">
                <div @click="hideModal" class="modal-button cancel-button">Cancelar</div>
                <button type="submit" class="modal-button">Editar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Mediator from "../service/Mediator";
  import { Icon } from '@iconify/vue';
  export default {
    data() {
      return {
        novoContato: { nome: '', idade: '' },
        modalVisible: false,
      };
    },
    components:{
      Icon,
    },
    methods: {
      async EditContacts() {
        try {
          Mediator.notify(this.novoContato, "EditContact");
          this.novoContato = { nome: '', idade: '' };
          Mediator.notify(true, "reloadScreen");
          this.hideModal(); 
        } catch (error) {
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
        Mediator.notify(this, "initEditContact");
    },
  };
  </script>
  
  <style scoped>

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
    padding: 40px 20px 0 20px;
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
  
  .open-modal-button {
    background-color: #fff;
    color: #007bff;
    border: 2px solid #007bff;
    transition: 0.5s;
    border-radius: 4px;
    cursor: pointer;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
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
  .open-modal-button:hover {
    background-color: #007bff;
    color: #fff;
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
  