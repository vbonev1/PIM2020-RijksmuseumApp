<template>
  <b-modal
    header-bg-variant="dark"
    header-text-variant="danger"
    body-bg-variant="dark"
    body-text-variant="light"
    footer-bg-variant="dark"
    footer-text-variant="dark"
    v-model="loginAlert"
    ref="my-modal"
    hide-footer
    title="Not logged in!"
  >
    <div class="d-block text-center">
      <p>Please log in or sign up in order to like and comment on artworks and sets.</p>
    </div>
    <b-button class="mt-3" variant="outline-success" block @click="openLogin()">Log in</b-button>
    <b-button class="mt-2" variant="outline-info" block @click="openSignup()">Sign up</b-button>
  </b-modal>
</template>
<script>
export default {
  props: {
    message: String
  },
  computed: {
    loginAlert: {
      get() {
        return this.$store.getters.getLoginAlert;
      },
      set(val) {
        this.$store.commit("updateLoginAlert", val);
      }
    }
  },
  methods: {
    openLogin() {
      this.$store.commit("updateLoginAlert", false);
      this.$router.push("/login");
    },
    openSignup() {
      this.$store.commit("updateLoginAlert", false);
      this.$router.push("/signup");
    }
  },
  mounted() {
    console.log("login alert mounted");
  }
};
</script>