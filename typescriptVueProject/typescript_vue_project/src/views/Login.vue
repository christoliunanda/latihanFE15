<template>
  <div class="LoginForm">
    <form>
        <h1 align="center">Login Page</h1>
        <label>ID</label><br>
        <input type="number" id="formId" v-model="formId" placeholder="Put your NIP or NIM here"><br>
        <button type="button" v-on:click="formLogIn()">Log In</button><br>
        <router-link to="/registration" tag="button">Registration</router-link>
        <router-view/>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import router from '../router'
import Vue2 from 'vue'
var self = this;

@Component
export default class LoginForm extends Vue {
  //Member
  private formId: number = 0;
 
  //Functions
  public formLogIn(): void{
      console.log("Log In Pressed");
      let userList = localStorage.getItem('users'); 
     
      if(userList != null){
          console.log('user not null')
          let tempUserList = JSON.parse(userList);
          for(let i in JSON.parse(userList)){ 
              if(tempUserList[i].id == this.formId){
                localStorage.setItem('currentUser',JSON.stringify(tempUserList[i]));
                console.log("Login Success");
                router.push({name: "Home"});
            
                this.$notify({
                group: 'foo',
                title: 'Important message',
                text: 'Hello user! This is a notification!'
                });

                break;
              }
          }
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

</style>