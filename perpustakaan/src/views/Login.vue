<template>
  <div class="content-full d-flex no-block justify-content-center align-items-center position-relative">
    <div class="card">
      <article class="card-body">
        <router-link :to="isRegister ? '/' : '/?register=true'" class="float-right btn btn-outline-primary">
          Sign {{isRegister ? 'In' : "Up"}}
        </router-link>
        <h4 class="card-title mb-4 mt-l"> Sign {{isRegister ? 'Up' : 'In'}}</h4>
        <form @submit.prevent="doSubmit" @reset.prevent="doReset">
          <div class="form-group">
            <label>Your email</label>
            <input class="form-control" placeholder="Email" v-model="user.username" type="email" required>
          </div>

          <div v-if="isRegister" class="form-group">
            <label>Your name</label>
            <input class="form-control" placeholder="Profile Name" v-model="user.profileName" type="text" required>
          </div>

          <div class="form-group">
            <label>Your password</label>
            <input class="form-control" placeholder="********" v-model="user.password" type="password" required>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">
              {{isRegister ? "Register" : "Login"}}
            </button>
          </div>

        </form>
      </article>
    </div>
    
  </div>
</template>

<script lang="ts">
import Axios, {AxiosResponse, AxiosError} from "axios";
import { Component, Vue } from 'vue-property-decorator';

import User from "./../entity/User";
import StatusCode from "./../common/StatusCode";

@Component
export default class Login extends Vue {
  
  public user: User = new User();

  public get isRegister(){
    return this.$route.query.register === 'true';
  }

  public doReset(){
    this.user = new User();
  }

  public doSubmit(){
    let valid: boolean = this.user.username !== "" && this .user.password !== "";

    if (this.isRegister) {
      return this.$route.query.register === 'true';
    }

    if(valid){
      const baseApi: string = "http://202.152.159.164:8088/perpus/";
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

<style lang='scss' scoped>
  .d-flex.no-block{
    min-height: 100vh;
  }
</style>