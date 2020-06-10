<template>
  <div id="app">
    <b-container fluid class="px-0" style="height: inherit;">
      <b-row style="width: 100%; height: 100%;">
        <b-col sm="12" class="px-0">
          <Toolbar />
        </b-col>
        <!--
     <div id='router-view'>
      <router-view/>
    </div>
        -->
        <b-col sm="12" class="px-0">
          <Feed />
        </b-col>
        <b-col sm="12" align-self="end" class="px-0">
          <Footer />
        </b-col>
      </b-row>
    </b-container>
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
  height: inherit;
}
</style>
