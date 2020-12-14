<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Basic Vue.app"/>
    
    <div v-if="curUser==null"> 
      <h1>Please <router-link to="/login">Login</router-link>
        <router-view/> First</h1>
    </div>
    
    <div v-if="curUser!=null">
      <h1>Welcome {{userName}} !</h1>
      <h1>Please click <router-link to="/logout">here</router-link>
        <router-view/> to Logout</h1>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  private curUser = localStorage.getItem('currentUser');
  private userName = "";
  constructor(){
    super();
    let tempParse = this.curUser !== null ? JSON.parse(this.curUser) : "";
    this.userName = tempParse.nama;
  }

  
}
</script>
