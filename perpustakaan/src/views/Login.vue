<template>
  <div class="login">
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import User from "./../entity/User"

export default class Login extends Vue {
  
  public user: User = new User();

  public get isRegister(){
    return true;
  }

  public doReset(){

  }

  public doSubmit(){
    let valid: boolean = this.user.username !== "" && this .user.password !== "";

    if (this.isRegister) {

    }
  }

}
</script>
