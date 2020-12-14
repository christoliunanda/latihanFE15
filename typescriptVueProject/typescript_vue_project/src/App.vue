<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      
      <router-link to="/about">About</router-link> 
      | <router-link to="/jsPlaceholder">jsPlaceholder</router-link> 
      <!-- |<router-link to="/registration">Registration</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/logout">Logout</router-link>  -->
    </div>
    <router-view/>

    <notifications group="foo" position="bottom right" />
    
  </div>
  
</template>



<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

table{
  margin-left: auto;
  margin-right: auto;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }


}
</style>
