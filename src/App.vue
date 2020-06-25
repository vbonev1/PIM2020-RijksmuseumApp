<template>
  <div id="app">
    <Toolbar
      v-show="$router.currentRoute.path != '/login' && $router.currentRoute.path != '/signup'"
    />
    <!--
     <div id='router-view'>
      <router-view/>
    </div>
    -->
    <router-view />
    <LoginAlert v-if="$store.getters.getLoginAlert" />
    <SignupSuccessfulAlert v-if="$store.getters.getSignupSuccessfulAlert" />
    <Footer id="footer" />
  </div>
</template>

<script>
import Toolbar from "./components/core/Toolbar.vue";
import Footer from "./components/core/Footer.vue";
import LoginAlert from "@/components/alerts/LoginAlert.vue";
import SignupSuccessfulAlert from "@/components/alerts/SignupSuccessfulAlert.vue";

// services for API consumption
import Artworks from "@/services/Artworks.js";
import Sets from "@/services/Sets.js";

export default {
  name: "App",
  components: {
    Toolbar,
    Footer,
    LoginAlert,
    SignupSuccessfulAlert
  },
  computed: {
    loggedUserId() {
      return this.$store.getters.getLoggedUserId;
    }
  },
  watch: {
    loggedUserId() {
      console.log(this.$store.getters.getArtworks);
    }
  },
  methods: {
    setInSets(passedSet) {
      for (let set of this.$store.getters.getSets) {
        if (set.id == passedSet.id) {
          return true;
        }
      }
      return false;
    }
  },
  mounted() {
    // deciding how many pages of artworks to request
    for (let i = 0; i < 1; i++) {
      Artworks.getArtworks(i).then(res => {
        for (let artObject of res.data.artObjects) {
          artObject["commentsIds"] = [];
          this.$store.commit("updateArtworks", artObject);
        }
      });
    }
    // deciding how many pages of sets to request
    for (let i = 0; i < 10; i++) {
      Sets.getSets(i).then(res => {
        for (let set of res.data.userSets) {
          // checking if the newly requested sets are all unique since the API sometimes returns the same set for different pages.
          // working only with sets which have contents in them
          if (!this.setInSets(set) && set.count != 0) {
            this.$store.commit("updateSets", set);
            Sets.getSetContents(set.id).then(res => {
              this.$store.commit("updateSetsContents", {
                id: res.data.userSet.id,
                items: res.data.userSet.setItems
              });
            });
          }
        }
      });
    }
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
