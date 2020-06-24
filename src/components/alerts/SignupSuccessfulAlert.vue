<template>
  <b-modal
    header-bg-variant="dark"
    header-text-variant="success"
    body-bg-variant="dark"
    body-text-variant="light"
    footer-bg-variant="dark"
    footer-text-variant="dark"
    v-model="signupSuccessfulAlert"
    ref="my-modal"
    hide-footer
    title="You successfully signed up!"
  >
    <div class="d-block text-center">
      <p>You can now log in and explore expert and amateur opinions on Rijks Social!.</p>
    </div>
    <b-button class="mt-3" variant="outline-success" block @click="openLogin()">Log in</b-button>
  </b-modal>
</template>
<script>
export default {
  props: {
    message: String
  },
  computed: {
    signupSuccessfulAlert: {
      get() {
        return this.$store.getters.getSignupSuccessfulAlert;
      },
      set(val) {
        this.$store.commit("updateSignupSuccessfulAlert", val);
      }
    }
  },
  methods: {
    openLogin() {
      this.$store.commit("updateSignupSuccessfulAlert", false);
      this.$router.push("/login");
    },
  },
};
</script>