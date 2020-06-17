<template>
  <div id="app">
    <Toolbar />
    <!--
     <div id='router-view'>
      <router-view/>
    </div>
    -->
    <Feed />
    <Footer id="footer" />
  </div>
</template>

<script>
import Toolbar from "./components/Toolbar.vue";
import Feed from "./components/Feed.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Toolbar,
    Feed,
    Footer
  },

};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  position: relative;
  padding-bottom: 50px;
  background-color: #242424;
}
#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
}
</style>
