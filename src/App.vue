<template>
  <div id="app">
    <Toolbar/>
    <!--
     <div id='router-view'>
      <router-view/>
    </div>
    -->
    <Feed/>
    <Footer/>
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
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
