<template>
  <div>
    <b-container fluid>
      <b-row align-h="center">
        <b-col cols="4">
          <b-card
            style="margin-top: 30vh;"
            header-bg-variant="dark"
            header-text-variant="light"
            body-bg-variant="dark"
            body-text-variant="dark"
          >
            <template v-slot:header>
              <b-img :src="require('@/assets/rijkssocial-cropped.png')" width="250" height="50"></b-img>
            </template>
            <b-form @submit="login()">
              <b-form-group id="input-group-1" label-for="input-1">
                <b-form-input
                  id="input-1"
                  v-model="user.email"
                  type="email"
                  required
                  placeholder="email"
                ></b-form-input>
                <b-form-invalid-feedback
                  :force-show="emailInvalid"
                >An account with the entered email doesn't exist.</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group id="input-group-2" label-for="input-2">
                <b-form-input id="input-2" v-model="user.name" required placeholder="Enter name"></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="success">Log in</b-button>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emailInvalid: false,
      user: {
        email: "",
        password: ""
      },
      show: true
    };
  },
  methods: {
    login(evt) {
      evt.preventDefault();
      for (let user of this.$store.getters.getUsers) {
        if (user.email == this.user.email) {
          this.emailInvalid = false;
          this.$store.commit(
            "updateLoggedUserId",
            this.$store.getters.getUsers.indexOf(user)
          );
        }
      }
      if (!this.$store.getters.getLoggedUserId) {
        this.emailInvalid = true;
      }
    }
  }
};
</script>