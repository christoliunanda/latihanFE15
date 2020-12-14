<template>
  <div class="LogoutForm">
    <button type="button" v-on:click="formLogOut()">Log Out</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import router from '../router'

@Component
export default class LoginForm extends Vue {
  //Member

  //Functions
  public formLogOut(): void{
      console.log("Log In Pressed");
      let curUser = localStorage.getItem('currentUser'); 
     
      if(curUser != null){
          localStorage.removeItem('currentUser')
          router.push({name: 'LoginForm'});
      }
  }

}
</script>


<style scoped lang="scss">

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