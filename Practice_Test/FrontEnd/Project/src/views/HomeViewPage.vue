<template>
  <div>
    <div class="main-container">
      <div class="header-static">
        <div class="form-header">
          <h1>Tabela de Usuários</h1>
        </div>
        <TableUser />
      </div>
    </div>
  </div>
</template>



<script>
import TableUser from '../components/template/TableUser.vue'
export default {
  name: 'HomeViewPage',
  data() {
    return {
  
    }
   },
  components: {
     TableUser
  },
  methods: {

  }
}
</script>

<style scoped>
.form-header{
  margin-bottom: 1.5rem;
}
.fileName p {
  font-size: 15px;
  margin-right: 4px;
  font-weight: bold;
}
.fileNameText{
  font-weight: 300 !important;
  transition: color 0.3s ease;
}
.form-header > h1{
  text-align: left;
}
.fileName{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color:#666666;
}

.icon-cancel{
    cursor: pointer;
    width: 23px;
    height: 25px;
    color: #EE6352;
}
.fileName:hover .fileNameText, .fileName:hover .icon-cancel {
  color: #EE6352;
  text-decoration: underline;
}
.icon-cancel {
  cursor: pointer;
  width: 23px;
  height: 25px;
  transition: color 0.3s ease;
}
.iconContainer {
  display: inline-block;
}
</style>