<template>
  <div style="height: 100%; position: relative;">
    <b-card bg-variant="dark">
      <b-card bg-variant="dark" v-for="comment in comments" :key="comment.id">
        <b-container fluid>
          <b-row>
            <b-col sm="2">
              <b-avatar :variant="comment.avatarVariant" :text="avatarText"></b-avatar>
            </b-col>
            <b-col sm="8">
              <p class="text-light">{{ comment.commentText }}</p>
            </b-col>
            <b-col sm="2">
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
    <div class="commentTextArea">
      <b-form-textarea
        v-model="currentComment"
        debounce="500"
        rows="2"
        max-rows="5"
        placeholder="What do you think about this painting?"
      ></b-form-textarea>
    </div>
  </div>
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