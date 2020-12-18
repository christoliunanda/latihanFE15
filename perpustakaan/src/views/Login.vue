<template>
  <div class="login">
    
  </div>
</template>

<script lang="ts">
import Axios, {AxiosResponse, AxiosError} from "axios";
import { Component, Vue } from 'vue-property-decorator';

import User from "./../entity/User";
import StatusCode from "./../common/StatusCode";

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

    if(valid){
      const baseApi: string = "http://202/152.159.164:8088/perpus/";
      const url: string = `${baseApi}auth/${this.isRegister ? 'do-register' : 'do-login'}`;

      Axios.post(url, this.user.serialize(), {responseType: 'json'}).then((response: AxiosResponse) =>{
        if(response && response.data && response.data.status === StatusCode.LOGIN_SUCCESS){
          const user: User = User.InstanceFrom(response.data.data);

          console.log(user);
          console.log(user instanceof User);
        }

      }).catch((error: AxiosError) =>{
          console.error(error);
      });

    }
  }

}
</script>
