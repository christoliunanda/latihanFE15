<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div v-if="curUser==null"> 
      <h1>Please click here to Login</h1>
    </div>
    
    <div v-if="curUser!=null">
      <h1>Please click here to Logout</h1>
    </div>
    

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  @Prop() private curUser: any;

  constructor(){
    console.log('test');
    super();
    let curUser = localStorage.getItem('currentUser');
    console.log(curUser);
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
