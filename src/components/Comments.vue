<template>
  <b-container fluid :style="windowWidth >= 768 ? 'height: 600px;' : 'height: 1200px;'">
    <b-row style="height: 100%;">
      <b-col
        cols="12"
        :style="windowWidth >= 768 ? 'max-height: 400px; overflow: auto;' : 'max-height: 800px; overflow: auto;'"
      >
        <b-row align-h="center">
          <b-col cols="12" v-show="artwork.commentsIds.length != 0">
            <b-card
              class="mt-2"
              bg-variant="dark"
              v-for="commentId in artwork.commentsIds"
              :key="commentId"
            >
              <b-container fluid>
                <b-row>
                  <b-col xs="12" md="2">
                    <b-avatar
                      :variant="comments[commentId].avatarVariant"
                      :text="comments[commentId].avatarText"
                    ></b-avatar>
                  </b-col>
                  <b-col xs="12" md="7">
                    <p class="text-light">{{ comments[commentId].commentText }}</p>
                  </b-col>
                  <b-col xs="12" md="3">
                    <div class="text-nowrap">
                      <b-button
                        size="sm"
                        :variant="variantLikeButton(commentId)"
                        pill
                        @click="likeComment(commentId)"
                      >
                        <b-icon variant="light" icon="hand-thumbs-up" />
                        <span class="text-white ml-1">{{ comments[commentId].likedBy.length}}</span>
                      </b-button>
                      <b-button
                        class="ml-2"
                        size="sm"
                        :variant="variantDislikeButton(commentId)"
                        pill
                        @click="dislikeComment(commentId)"
                      >
                        <b-icon variant="light" icon="hand-thumbs-down" />
                        <span class="text-white ml-1">{{ comments[commentId].dislikedBy.length }}</span>
                      </b-button>
                    </div>
                  </b-col>
                </b-row>
              </b-container>
            </b-card>
          </b-col>
          <b-col cols="12" v-show="artwork.commentsIds.length == 0">
            <b-card bg-variant="dark">
              <b-container fluid>
                <b-row align-h="center">
                  <b-col sm="10">
                    <p class="text-light">There are no comments on this artwork yet</p>
                  </b-col>
                </b-row>
              </b-container>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" align-self="end">
        <b-container fluid>
          <b-row align-h="end">
            <b-col cols="12">
              <b-form-textarea
                style="border-radius: 10px;"
                v-model="currentComment"
                debounce="500"
                rows="2"
                max-rows="5"
                placeholder="What do you think about this painting?"
              ></b-form-textarea>
            </b-col>
            <b-col sm="3">
              <!-- to fix -->
              <b-button @click="postComment" variant="success" class="mt-2 ml-4" size="sm">
                <div class="text-nowrap">
                  <b-icon variant="light" class="ml-0 mr-2" icon="arrow-up-right-circle-fill" />
                  <span>post</span>
                </div>
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  props: {
    artwork: Object
  },
  data() {
    return {
      currentComment: ""
    };
  },
  computed: {
    windowWidth() {
      return window.innerWidth;
    },
    comments() {
      return this.$store.getters.getComments;
    },
    loggedUser() {
      return this.$store.getters.getLoggedUser;
    },
    users() {
      return this.$store.getters.getUsers;
    }
  },
  methods: {
    postComment() {
      if (this.loggedUser) {
        this.$store.commit("updateComments", {
          createdAt: new Date().toLocaleString(),
          author: this.loggedUser.username,
          avatarText: this.loggedUser.avatarText,
          avatarVariant: this.loggedUser.avatarVariant,
          commentText: this.currentComment,
          likedBy: [],
          dislikedBy: []
        });
        this.$store.commit(
          "updateLoggedUserComments",
          this.comments.length - 1
        );
        this.artwork.commentsIds.push(this.comments.length - 1);
      } else {
        this.$store.commit("updateLoginAlert", true);
      }
    },
    likeComment(commentId) {
      if (
        this.comments[commentId].likedBy.includes(
          this.users.indexOf(this.loggedUser)
        )
      ) {
        let indexToRemove = this.comments[commentId].likedBy.indexOf(
          this.users.indexOf(this.loggedUser)
        );
        this.comments[commentId].likedBy.splice(indexToRemove, 1);
      } else {
        this.comments[commentId].likedBy.push(
          this.users.indexOf(this.loggedUser)
        );
      }
    },
    dislikeComment(commentId) {
      if (
        this.comments[commentId].dislikedBy.includes(
          this.users.indexOf(this.loggedUser)
        )
      ) {
        let indexToRemove = this.comments[commentId].dislikedBy.indexOf(
          this.users.indexOf(this.loggedUser)
        );
        this.comments[commentId].dislikedBy.splice(indexToRemove, 1);
      } else {
        this.comments[commentId].dislikedBy.push(
          this.users.indexOf(this.loggedUser)
        );
      }
    },
    variantLikeButton(commentId) {
      if (
        this.comments[commentId].likedBy.includes(
          this.users.indexOf(this.loggedUser)
        )
      ) {
        return "success";
      }
      return "outline-primary";
    },
    variantDislikeButton(commentId) {
      if (
        this.comments[commentId].dislikedBy.includes(
          this.users.indexOf(this.loggedUser)
        )
      ) {
        return "danger";
      }
      return "outline-primary";
    }
  },
  watch: {}
};
</script>
<style scoped>
.commentTextArea {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>