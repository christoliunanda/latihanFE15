<template>
  <div class="home">
    

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
declare var require: any

export default class jsPlaceHolderView extends Vue {
    public axios = require('axios').default;

    async getUser() {
        console.log("Get User Called")
        try {
            const response = await this.axios.get('http://jsonplaceholder.typicode.com/users');
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    constructor(){
        super();
        this.getUser();
    }


//   private curUser = localStorage.getItem('currentUser');
//   private userName = "";
//   constructor(){
//     super();
//     let tempParse = this.curUser !== null ? JSON.parse(this.curUser) : "";
//     this.userName = tempParse.nama;
//   }

  
}
</script>
