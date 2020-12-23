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

          <div v-if="isRegister" class="form-group">
            <label>Your address</label>
            <input class="form-control" placeholder="Address" v-model="user.address" type="text" required>
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
import {get} from 'lodash';
import Axios, {AxiosResponse, AxiosError} from "axios";
import { Component, Vue } from 'vue-property-decorator';

import Session from "./../common/Session";
import User from "./../entity/User";
import Notification from "./../common/Notification";
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
    console.log("doSubmit");
    let valid: boolean = this.user.username !== "" && this.user.password !== "";

    

    if (this.isRegister) {
      valid = true && this.user.profileName !=="" && this.user.address !== "";
    }

    if(valid){
      const baseApi: string = "http://202.152.159.164:8088/perpus/";
      const url: string = `${baseApi}auth/${this.isRegister ? 'do-register' : 'do-login'}`;

      //console.log(url);

      console.log(this.user.serialize());
      Axios.post(url, this.user.serialize(), {responseType: 'json'}).then((response: AxiosResponse) =>{
        console.log(response);
        //console.log(User);
        if(get(response, 'data.status') === StatusCode.LOGIN_SUCCESS){
          Session.set(User.InstanceFrom(response.data.data));
          const temp = User.InstanceFrom(response.data.data);
          console.log(temp);
          console.log(temp instanceof User);
          this.$router.push("/home");
          this.$notify({
              group:'notif',
              title:'Login Success!'
          });
          
          
        }else if(get(response,'data.status') === StatusCode.SAVE_SUCCESS){
          this.$notify({
              group:'notif',
              title:'Register Success!'
          });
          this.$router.push({path: "/"});
        }else{
          this.$notify({
              group:'notif',
              title:get(response,'data.status')
          });
        }

      }).catch((error: AxiosError) =>{
          console.error(error);

          this.$notify({
              group:'notif',
              title:'Connection Error!'
          });

          //Notification.snackbar(StatusCode.CONNECTION_FAILED);
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