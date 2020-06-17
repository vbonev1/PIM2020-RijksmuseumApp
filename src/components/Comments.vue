<template>
  <b-container fluid :style="windowWidth >= 768 ? 'height: 600px;' : 'height: 1200px;'">
    <b-row style="height: 100%;">
      <b-col cols="12" :style="windowWidth >= 768 ? 'max-height: 400px; overflow: auto;' : 'max-height: 800px; overflow: auto;'">
        <b-row>
          <b-card bg-variant="dark">
            <b-card bg-variant="dark" v-for="comment in comments" :key="comment.id">
              <b-container fluid>
                <b-row>
                  <b-col xs="12" md="2">
                    <b-avatar :variant="comment.avatarVariant" :text="avatarText"></b-avatar>
                  </b-col>
                  <b-col xs="12" md="8">
                    <p class="text-light">{{ comment.commentText }}</p>
                  </b-col>
                  <b-col xs="12" md="2">
                    <div class="text-nowrap">
                      <b-icon variant="light" icon="hand-thumbs-up" />
                      <span class="text-white ml-1">{{ comment.likes}}</span>
                      <b-icon class="ml-2" variant="light" icon="hand-thumbs-down" />
                      <span class="text-white ml-1">{{ comment.dislikes }}</span>
                    </div>
                  </b-col>
                </b-row>
              </b-container>
            </b-card>
          </b-card>
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
                <b-button variant="success" class="mt-2 ml-4" size="sm">
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
    comments: Object
  },
  data() {
    return {
      currentComment: ""
    };
  },
  computed: {
    windowWidth() {
      return window.innerWidth;
    }
  },
  watch: {
    comments(val) {
      console.log(val);
    }
  }
};
</script>
<style scoped>
.commentTextArea {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>