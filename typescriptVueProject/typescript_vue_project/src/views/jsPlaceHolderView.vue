<template>
    <div class="jsPlaceHolderView">
        <table>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>website</th>
            </tr>
            <tr v-for="data in jsonData.data" :key="data.id">
            <td>{{ data.id }}</td>
            <td>{{ data.name }}</td>
            <td>{{ data.username }}</td>
            <td>{{ data.email }}</td>
            <td>{{ data.phone }}</td>
            <td>{{ data.website }}</td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
declare var require: any

export default class jsPlaceHolderView extends Vue {
    public axios = require('axios').default;
    public jsonData= [{}];
    async getUser() {
        console.log("Get User Called")
        try {
            const response = await this.axios.get('http://jsonplaceholder.typicode.com/users');
            this.jsonData = response;
            console.log(this.jsonData);
            //console.log(response);
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
