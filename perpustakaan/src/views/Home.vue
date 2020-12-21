<template>
  <div class="home">
    Hello {{user.profileName}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Session from "./../common/Session";
import User from "./../entity/User";

export default class Home extends Vue {
  public get user() : User{
    return Session.get();
  }
}
</script>

<style lang='scss' scoped>
  .home-page{
    color:#404E67;
    background: #F5F7FA;
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;

  }
</style>