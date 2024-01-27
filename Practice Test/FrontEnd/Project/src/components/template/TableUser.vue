<template>
  <div>
    <MessageError :msg="msg" v-show="msg" />
    <MenssageSuccess :msg="msgS" v-show="msgS" />
    <div class="NavButton">
      <div class="search-container" >
        <Icon class="icon-search" icon="material-symbols:search" />
        <input type="text" v-model="searchQuery"  class="input-with-icon" placeholder="Pesquisar Contato ...">
      </div>
      <CreateContact/>
    </div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Nome</th>
          <th>Idade</th>
          <th></th>
        </tr>
      </thead>
      <!-- v-for="contact in Contacts" :key="contact.id" -->
      <tbody v-for="contact in filteredContacts" :key="contact.id">
        <tr>
          <td style="width: 2px;">
            <div class="buttonsCrud flexstart">
              <div @click="toggleTelefone(contact.id)" >
                <div v-if ="visiblePhones[contact.id]" title="Fechar" class="buttonsCrudInModal marginNone">
                <Icon icon="mdi:chevron-down" class="formTableIcon" :rotate="2" />
                </div>
                <div v-else  title="Exbir Telefones" class="buttonsCrudInModal marginNone">
                  <Icon icon="mdi:chevron-down" class="formTableIcon"  />
                </div>
              </div>
            </div>
          </td>
          <td>
            {{ contact.id }}
          </td>
          <td>{{ contact.nome }}</td>
          <td>{{ contact.idade }}</td>
          <td>
            <div class="buttonsCrud">
              <div @click="GetIdContact(contact)" title="Criar Telefone">
                <CreatePhone/>
              </div>
              <div>
                <div @click="GetIdContact(contact)" title="Editar o Contato">
                  <EditContact/>
                </div>
              </div>
              <div  @click="GetIdContact(contact)" title="Deletar o Contato">
                <DeleteContact/>
              </div>
            </div>
          </td>

        </tr>
        <tr>
          <td class="table-toggle" :colspan="5" v-if="visiblePhones[contact.id]" >
            <table class="toggle">
              <thead>
                <tr>
                  <th class="toggle-style">ID</th>
                  <th class="toggle-style">Número de Telefone</th>
                  <th class="toggle-style"></th>
                </tr>
              </thead>
              <tbody v-if="Phones[contact.id]">
                <tr v-for="(telefone) in Phones[contact.id]" :key="telefone.id">
                  <td class="toggle-style">{{ telefone.id }}</td>
                  <td class="toggle-style">{{ formatPhone(telefone.numero) }}</td>
                  <td class="toggle-style">
                    <div class="buttonsinfoModal">
                      <div  @click="GetIdContact(telefone)" title="Editar o Contato">
                        <EditPhone/>                    
                      </div>
                      <div @click="GetIdContact(telefone)" title="Deletar o Contato">
                        <DeletPhone/>
                      </div>
                    </div>
                  </td>
                </tr>                
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import { Icon } from '@iconify/vue';
import CreateContact from './CreateContact.vue';
import CreatePhone from './CreatePhone.vue';
import EditContact from './EditContact.vue'
import EditPhone from './EditPhone.vue'
import DeleteContact from './DeleteContact.vue';
import DeletPhone from './DeletePhone.vue'
import Mediator from "../service/Mediator";

import MenssageSuccess from "../MessageSuccess.vue"
import MessageError from "../MessageError.vue"

export default {
  data() {
    return {
      Contacts: [],
      msg: null,
      msgS: null,
      Phones: {}, 
      visiblePhones: {},
      PhoneContact: {},
      searchQuery: '',
      GetPhone:{}
    };
  },
  components: {
    CreateContact,
    CreatePhone,
    EditContact,
    EditPhone,
    DeleteContact,
    DeletPhone,
    Icon,
    MessageError,
    MenssageSuccess
  },
computed: {
    filteredContacts() {
    return this.Contacts.filter(contact => {
      const idadeStr = contact.idade.toString();
      const idStr = contact.id.toString();

      return contact.nome.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            idadeStr.includes(this.searchQuery.toLowerCase()) ||
              idStr.includes(this.searchQuery.toLowerCase());
      });
    },

  },
  methods: {
    async loadContacts() {
      try {
        const response = await axios.get('http://localhost:3000/api/contacts');
        this.Contacts = response.data;
        this.Contacts.sort((a, b) => a.id - b.id);
        this.Contacts.forEach(contact => {
        this.visiblePhones[contact.id] = false;
        });
      } catch (error) {
        this.msg = 'Erro ao carregar contatos' + error;
        setTimeout(() => (this.msg = ''), 3000);
        console.error('Erro ao carregar contatos:', error);
      }
    },
    async loadPhoneContact(contactId) {
      try {
        const response = await axios.get(`http://localhost:3000/api/phone/${contactId}`);
        const phones = response.data;
        phones.sort((a, b) => a.id - b.id);
        this.Phones[contactId] = phones;
        this.GetPhone = this.Phones[contactId];
        this.visiblePhones[contactId] = true;

        if(phones.length  == 0){
          this.msg = 'Esse contato não possui números de telefone, adcione um novo número de telefone';
          setTimeout(() => (this.msg = ''), 2000);
        }
      } catch (error) {
        this.msg = 'Erro ao carregar Telefones:' + error;
        setTimeout(() => (this.msg = ''), 3000);
        console.error('Erro ao carregar Telefones:', error);
      }
    },
    formatPhone(Phone) {
      if (Phone.length === 11) {
        return `(${Phone.substr(0, 2)}) ${Phone.substr(2, 5)}-${Phone.substr(7, 4)}`;
      } else if(Phone.length === 9){
        return `${Phone.substr(0, 5)}-${Phone.substr(5, 8)}`;
      }
      else {
        return Phone;
      }
    },
    GetIdContact(data){
      this.PhoneContact = data;
    },
    async AddPhone(number){
      try {
        await axios.post(`http://localhost:3000/api/create/phone/${this.PhoneContact.id}`, number);
        Mediator.notify(true, "reloadScreen");
        this.msgS = 'Telefone adcionado com sucesso!';
        setTimeout(() => (this.msgS = ''), 3000);
      } catch (error) {
        this.msg = 'Erro ao adicionar telefone' + error;
        setTimeout(() => (this.msg = ''), 3000);
        console.error('Erro ao adicionar telefone:', error);
      }
    },
    toggleTelefone(contactId) {
      if (this.visiblePhones[contactId]) {
        this.visiblePhones[contactId] = false;
        
      } else {
        this.loadPhoneContact(contactId);
      }
    },
    async EditContacts(data) {
        try {
          await axios.put(`http://localhost:3000/api/edit/contact/${this.PhoneContact.id}`, data);
          this.msgS = 'Contato editato com sucesso!';
          setTimeout(() => (this.msgS = ''), 3000);
          await Mediator.notify(true, "reloadScreen");
        } catch (error) {
          this.msg = 'Erro ao editar o contato' + error;
          setTimeout(() => (this.msg = ''), 3000);
          console.error('Erro ao adicionar editar contato:', error);
        }
    },
    async EditPhone(data) {
      try {
        await axios.put(`http://localhost:3000/api/edit/phone/${this.PhoneContact.id}`, data);
        this.msgS = 'Telefone editado com sucesso!';
        setTimeout(() => (this.msgS = ''), 3000);
        await Mediator.notify(true, "reloadScreen");
      } catch (error) {
        this.msg = 'Erro ao editar o telefone' + error;
          setTimeout(() => (this.msg = ''), 3000);
        console.error('Erro ao adicionar editar telefone:', error);
      }
    },
    async DeleteContact(){
      try {
        await axios.delete(`http://localhost:3000/api/delete/contact/${this.PhoneContact.id}`);
        this.msgS = 'Contato deletado com sucesso!';
        setTimeout(() => (this.msgS = ''), 3000);
        await Mediator.notify(true, "reloadScreen");
      } catch (error) {
          this.msg = 'Erro ao deletar o contato' + error;
          setTimeout(() => (this.msg = ''), 3000);
          console.error('Erro ao  deletar contato:', error);
      }
    },
    async DeletePhone(){
      try {
        await axios.delete(`http://localhost:3000/api/delete/phone/${this.PhoneContact.id}`);
        this.msgS = 'Telefone deletado com sucesso!';
        setTimeout(() => (this.msgS = ''), 3000);
        await Mediator.notify(true, "reloadScreen");
      } catch (error) {
          this.msg = 'Erro ao deletar o telefone' + error;
          setTimeout(() => (this.msg = ''), 3000);
          console.error('Erro ao deletar o telefone:', error);
      }
    }
  
  },
  mounted() {
    this.loadContacts();
   
  },
  created() {
    Mediator.notify(this, "initTable");
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}
form {
  margin-bottom: 20px;
}
.buttonsCrud{
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-end;
}
.buttonsinfoModal{
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-end;
}
.NavButton{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.input-with-icon {
  padding-left: 30px !important;
}
.search-container {
    background-color: white;
    margin-bottom: -1px;
    position: relative;
}
.icon-search {
    position: absolute;
    left: 10px;
    top: 46%;
    transform: translateY(-50%);
    color: #007bff;
}
.titleCenterInModal{
  display: flex;
  align-items: center;
  justify-content: center;
}
.buttonsCrudInModal{
  background-color: #fff;
  color: #007bff;
  border: 2px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
  margin-right: 10px;
}

.buttonsCrudInModal:hover {
  background-color: #007bff;
  color: #fff;
}

input[type="text"],
input[type="number"],
button {
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
.flexstart{
  justify-content: flex-start;
 
}
.marginNone{
  margin-right: 0 !important;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

td, th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table-toggle{
  background-color: #fff;
}
.toggle-style {
  border: none;
  background-color: #faf9f9!important;
}
.toggle{
  margin: 0;
  border: 1px solid #ddd;
}


</style>
