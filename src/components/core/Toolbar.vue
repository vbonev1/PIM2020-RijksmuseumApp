<template>
  <div>
    <b-progress height="5px" :value="value" :max="max"></b-progress>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item href="#">
          <b-img :src="require('@/assets/rijkssocial-cropped.png')" width="250" height="50"></b-img>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown v-if="loggedUser" right>
          <template v-slot:text>
            <b-avatar :variant="loggedUser.avatarVariant"></b-avatar>
            <span class="ml-2 text-light">{{ loggedUser.username }}</span>
          </template>
          <b-dropdown-item href="#">Account</b-dropdown-item>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
          <b-dropdown-item href="#">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
        <div v-else>
          <b-button variant="outline-info" @click="$router.push('/signup')">Sign up</b-button>
          <b-button class="ml-2" variant="outline-success" @click="$router.push('/login')">
            Login
            <b-icon icon="arrow-bar-right" aria-hidden="true"></b-icon>
          </b-button>
        </div>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    value: 0,
    max: 100
  }),
  computed: {
    loggedUser() {
      if (this.$store.getters.getLoggedUserId) {
        return this.$store.getters.getLoggedUser;
      }
      return null;
    }
  },
  methods: {
    visualizeProgress() {
      this.value = 0;
      let interval = setInterval(() => (this.value += 25), 50);
      if (this.value == 100) {
        clearInterval(interval);
      }
    },
    login() {
      // login functionality
    }
  },
  mounted() {
    this.visualizeProgress();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
