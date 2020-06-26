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
            <b-form>
              <b-container fluid>
                <b-row>
                  <b-col sm="6">
                    <b-form-group id="input-group-1" label-for="input-1">
                      <b-form-input
                        id="input-1"
                        v-model="user.email"
                        type="email"
                        required
                        placeholder="email"
                      ></b-form-input>
                      <b-form-invalid-feedback :force-show="emailEmpty">Email is required.</b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group id="input-group-2" label-for="input-2">
                      <b-form-input
                        id="input-2"
                        v-model="user.username"
                        required
                        placeholder="username"
                      ></b-form-input>
                      <b-form-invalid-feedback :force-show="usernameEmpty">Username is required.</b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12">
                    <b-form-group id="input-group-3" label-for="input-3">
                      <b-form-input
                        id="input-3"
                        v-model="user.personalDescription"
                        placeholder="personal description"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12">
                    <b-form-group id="input-group-4" label-for="input-4">
                      <b-form-select
                        id="input-4"
                        v-model="user.personalAssessment"
                        :options="personalAssessments"
                      ></b-form-select>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12">
                    <b-form-group id="input-group-5" label-for="input-5">
                      <b-form-input
                        id="input-5"
                        v-model="user.name"
                        required
                        placeholder="password"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-container>
              <b-button variant="info" @click="signup()">Sign up</b-button>
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
      user: {
        email: "",
        username: "",
        password: "",
        likedArtworks: [],
        commentedArtworks: [],
        likedSets: [],
        following: [],
        followers: [],
        commentsIds: [],
        personalDescription: "",
        personalAssessment: null,
        avatarVariant: "primary"
      },
      emailEmpty: false,
      usernameEmpty: false,
      personalAssessments: [
        { value: null, text: "How much do you know about art?" },
        { value: 0, text: "I am new to the world of art" },
        {
          value: 1,
          text: "I have some minor experience with and knwoledge about art."
        },
        {
          value: 2,
          text:
            "I have relativly large experience with and knowledge about art."
        },
        { value: 3, text: "When it comes to art, I am your guy!" }
      ],
      show: true
    };
  },
  methods: {
    signup() {
      if (this.user.email == "") {
        this.emailEmpty = true;
      } else {
        this.emailEmpty = false;
      }
      if (this.user.username == "") {
        this.usernameEmpty = true;
      } else {
        this.usernameEmpty = false;
      }
      if (!this.emailEmpty && !this.usernameEmpty) {
        this.$store.commit("updateUsers", this.user);
        this.$store.commit("updateSignupSuccessfulAlert", true);
        this.$router.push("/");
      }
    }
  }
};
</script>