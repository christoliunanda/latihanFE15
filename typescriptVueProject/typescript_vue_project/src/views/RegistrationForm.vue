<template>
  <div class="RegistrationForm">
    <form>
        <h1 align="center">Registration Form</h1>
        <label>ID</label><br>
        <input type="number" id="formId" v-model="formId" placeholder="Put your NIP or NIM here"><br>
        <label>Nama</label><br>
        <input type="text" id="formNama" v-model="formNama" placeholder="Put your name here"><br>
        <label>Role</label><br>
        <input type="radio" id="formRole" v-model="formRole" value="Admin">
        <label id="formRole" for="formRole">Admin</label>
        <input type="radio" id="formRole" v-model="formRole" value="Mahasiswa">
        <label id="formRole" for="formRole">Mahasiswa</label> <br>
        <button type="button" v-on:click="formSubmit()">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {Admin} from './../entity/Admin';
import {Mahasiswa} from './../entity/Mahasiswa';
import router from '../router'


@Component
export default class RegistrationForm extends Vue {
  //Member
  private formNama: string = "";
  private formId: number = 0;
  private formRole: string = "";
  //Functions
  public formSubmit(): void{
    if(this.formRole == "Admin" ){
      const newAdmin: Admin = new Admin();
      newAdmin.nip = this.formId;
      newAdmin.id = this.formId;
      newAdmin.nama = this.formNama;
      newAdmin.showInLog();

      this.regisNewUser(newAdmin);


    }else if(this.formRole == "Mahasiswa" ){
      const newMahasiswa: Mahasiswa = new Mahasiswa();
      newMahasiswa.nim = this.formId;
      newMahasiswa.id = this.formId;
      newMahasiswa.nama = this.formNama;
      newMahasiswa.showInLog();

      this.regisNewUser(newMahasiswa);
    }else{
      alert("Role non-existant, please choose a role");
    }

  }

  public regisNewUser(newUser:any){
      //Local Storage Save logic
      let oldUsersList = localStorage.getItem('users');
      if(oldUsersList == null){
        let users = [newUser];
        localStorage.setItem('users',JSON.stringify(users));
      }else{
        let users = [];
        let tempParse = JSON.parse(oldUsersList);
        for(let index in JSON.parse(oldUsersList)){
          
          users.push(tempParse[index]);
        }
        users.push(newUser);
        this.$notify({
            group: 'foo',
            title: 'Important message',
            text: 'Registration Success!'
        });
        
        localStorage.setItem('users',JSON.stringify(users));
        router.push({name: 'Home'});
      }
  }




}
</script>

<style scoped lang="scss">
input[type=text] {
    width: 50%;
    background-repeat: no-repeat;
    padding: 10px 10px 10px 20px;
    margin: 10px 0;
    box-sizing: border-box;
    transition: width 0.6s ease-in-out;
}
input[type=text]:focus {
    background-color: lightgray;
    border: 3px solid #555;
}

input[type=number] {
    width: 50%;
    background-repeat: no-repeat;
    padding: 10px 10px 10px 20px;
    margin: 10px 0;
    box-sizing: border-box;
    transition: width 0.6s ease-in-out;
}
input[type=number]:focus {
    background-color: lightgray;
    border: 3px solid #555;
}

button{
    background-color: black;
    border: none;
    color: white;
    text-decoration: none;
    padding: 14px 28px;
    margin: 4px 2px;
    cursor: pointer;
}

input[type=radio]{

  margin: 10px 0;
}

label[id=formRole]{
  padding: 10px 15px 10px 10px;
  margin: 10px 0;
}
</style>