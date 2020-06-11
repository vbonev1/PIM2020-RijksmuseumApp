<template>
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
    v-model="value"
    @keydown.esc="$emit('close', false)"
  >
    <b-card bg-variant="dark" height="100%">
      <!-- <v-icon @click="$emit('input', false);" large>mdi-close</v-icon> -->
      <b-container fluid class="px-0">
        <b-row>
          <b-col style="height: 500px;" sm="6">
            <b-img
              style=" display: block; margin-left: auto; margin-right: auto;"
              :src="artwork.webImage.url"
              width="400px"
            ></b-img>
          </b-col>
          <b-col style="height: 500px;" sm="6">
                <comments :comments="artwork.comments"></comments>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </b-modal>
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
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {},
  watch: {
    value(val) {
      if (!val) {
        this.$emit("close", val);
      }
    }
  }
};
</script>
<style>
</style>