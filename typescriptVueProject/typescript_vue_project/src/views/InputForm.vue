<template>
  <div class="InputForm">
    <form>
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
interface User{
  id:number;
  nama:string;
  role: Role;
}

enum Role{
  ADMIN = "ADMIN",
  MAHASISWA = "MAHASISWA"
}

abstract class BaseUser implements User{
  public id: number = 0;
  public nama: string = "";
  public abstract role: Role;

  showInLog(){
    console.log(`Full Detail\nRole: ${this.role}\nName: ${this.nama}\nID: ${this.id}`);
  }
}

class Mahasiswa extends BaseUser{
  public nim: number = 0;
  public role: Role = Role.MAHASISWA

  showInLog(){
    console.log(`Welcome ${this.role} ${this.nama} with NIM of ${this.nim}\n`);
    //console.log("Welcome "+this.role+" "+this.nama+"\n"+" with NIM of "+this.nim+"\n");
    super.showInLog();
  }
}

class Admin extends BaseUser {
  public nip: number = 0;
  public role: Role= Role.ADMIN;
  showInLog(){
    console.log(`Welcome ${this.role} ${this.nama} with NIM of ${this.nip}\n`);
    //console.log("Welcome "+this.role+" "+this.nama+" with NIP of "+this.nip+"\n");
    super.showInLog();
  }
}

@Component
export default class InputForm extends Vue {
  private formNama: string = "";
  private formId: number = 0;
  private formRole: string = "";
  public formSubmit(): void{
    
    if(this.formRole == "Admin" ){
      const newAdmin: Admin = new Admin();
      newAdmin.nip = this.formId;
      newAdmin.id = this.formId;
      newAdmin.nama = this.formNama;
      newAdmin.showInLog();
    }else if(this.formRole == "Mahasiswa" ){
      const newMahasiswa: Mahasiswa = new Mahasiswa();
      newMahasiswa.nim = this.formId;
      newMahasiswa.id = this.formId;
      newMahasiswa.nama = this.formNama;
      newMahasiswa.showInLog();
    }else{
      alert("Role non-existant, please choose a role");
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