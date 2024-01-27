<template>
  <div>
    <button @click="showModal" class="open-modal-button">+</button>
    <MenssageSuccess :msg="msgS" v-show="msgS" />
    
    <div class="modal" :class="{ 'modal-visible': modalVisible }">
      <MessageError :msg="msg" v-show="msg" />
      <div class="modal-content">
        <span @click="hideModal" class="close-modal-button">&times;</span>
        <h2 class="ColorBack">Adicionar Telefone </h2>
        <form class="bodyModal" @submit.prevent="addPhone">
          <div class="inputModal">
            <input v-model="formattedPhoneNumber" type="text" placeholder="Número de Telefone" class="modal-input" maxlength="15">
            
          </div>
          <div class="ButtonModal">
              <div @click="hideModal" class="modal-button cancel-button">Cancelar</div>
              <button class="modal-button">Adicionar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import Mediator from "../service/Mediator";
import MessageError from "../MessageError.vue"
import MenssageSuccess from "../MessageSuccess.vue"
export default {
  data() {
    return {
      telefone: { numero: '' },
      msg: null,
      msgS: null,
      modalVisible: false,
      PhoneContact: {},
    };
  },
  components:{
    MessageError,
    MenssageSuccess
  },
  computed: {
    formattedPhoneNumber: {
      get() {
        return this.telefone.numero;
      },
      set(value) {
        this.telefone.numero = this.formatPhoneNumber(value);
      }
    }
  },
  methods: {
    UpdateData(data){
      if(data){
        this.PhoneContact = data;
      }
    },

    async addPhone() {
      try {
        const phoneNumber = this.telefone.numero.replace(/\D/g, '');

        if (!phoneNumber || isNaN(parseInt(phoneNumber))) {
          this.msg = 'O número de telefone deve conter apenas dígitos numéricos ou está vazio!';
          setTimeout(() => (this.msg = ''), 3000);
        }else{
          Mediator.notify(this.telefone, "AddPhone");
          this.telefone = { numero: '' };
          this.msgS = 'Telefone adcionado com sucesso!';
          setTimeout(() => (this.msgS = ''), 3000);
          this.hideModal(); 
        }
      } catch (error) {
        console.error('Erro ao adicionar telefone:', error);
        this.msg = 'Erro ao carregar contatos' + error;
        setTimeout(() => (this.msg = ''), 3000);
      }
    },

    showModal() {
     this.modalVisible = true;
    },
    
    hideModal() {
      this.modalVisible = false;
    },
    formatPhoneNumber(phoneNumber) {
      let cleaned = phoneNumber.replace(/\D/g, '');
      cleaned = cleaned.slice(0, 11);
      let formatted = '';
      for (let i = 0; i < cleaned.length; i++) {
        if (i === 0) {
          formatted = '(';
        } else if (i === 2) {
          formatted += ') ';
        } else if (i === 7) {
          formatted += '-';
        }
        formatted += cleaned[i];
      }
      return formatted;
    }
  },
  created() {
      Mediator.notify(this, "initCreatePhone");
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

 .open-modal-button {
  width: 40px;
  height: 40px;
  background-color: #fff;
  color: #007bff;
  border: 2px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.5s;
  margin-right: 10px;
}
.ColorBack{
  color: black;
}
 
.open-modal-button:hover {
  background-color: #007bff;
  color: #fff;
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
  margin-top: 38px;
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
