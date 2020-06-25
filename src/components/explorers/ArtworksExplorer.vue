<template>
  <div>
    <b-modal
      header-bg-variant="dark"
      header-text-variant="light"
      body-bg-variant="dark"
      body-text-variant="dark"
      footer-bg-variant="dark"
      footer-text-variant="dark"
      centered
      size="xl"
      :title="artwork.longTitle"
      v-model="modalOpen"
    >
      <b-card :style="windowWidth >= 768 ? 'height: 700px;' : 'height: 1400px;'" bg-variant="dark">
        <!-- <v-icon @click="$emit('input', false);" large>mdi-close</v-icon> -->
        <b-container fluid class="px-0">
          <b-row>
            <b-col xs="12" md="6">
              <b-img
                :style="windowWidth >= 768 ? 'width: 100%; height: 600px;' : 'width: 100%; height: 1200px;'"
                :src="artwork.webImage ? artwork.webImage.url : require('@/assets/loading.jpg')"
              ></b-img>
              <b-button
                class="mt-2"
                size="lg"
                variant="outline-danger"
                pill
                @click="invertArtworkLike()"
              >
                <b-icon v-show="likedByLoggedUser == false" variant="danger" icon="heart" />
                <b-icon v-show="likedByLoggedUser" variant="danger" icon="heart-fill" />
              </b-button>
            </b-col>
            <b-col xs="12" md="6">
              <comments :artwork="artwork"></comments>
            </b-col>
          </b-row>
        </b-container>
      </b-card>
      <template v-slot:modal-footer>
        <div style="display: none;" />
      </template>
    </b-modal>
  </div>
</template>


<script>
import Comments from "@/components/Comments.vue";

export default {
  components: {
    Comments
  },
  props: {
    value: Boolean,
    artwork: Object
  },
  methods: {
    invertArtworkLike() {
      if (this.loggedUser) {
        this.$store.commit("updateLoggedUserLikedArtworks", this.artwork.id);
      } else {
        this.$store.commit("updateLoginAlert", true);
      }
    }
  },
  computed: {
    windowWidth() {
      return window.innerWidth;
    },
    loggedUser() {
      return this.$store.getters.getLoggedUser;
    },
    loginAlert() {
      return this.$store.getters.getLoginAlert;
    },
    likedByLoggedUser() {
      if (
        this.loggedUser &&
        this.loggedUser.likedArtworks.includes(this.artwork.id)
      ) {
        return true;
      }
      return false;
    },
    modalOpen: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("modalStateChanged", val);
      }
    }
  },
};
</script>
<style>
</style>