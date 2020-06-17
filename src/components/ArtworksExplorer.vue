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
    <b-card :style="windowWidth >= 768 ? 'height: 700px;' : 'height: 1400px;'" bg-variant="dark">
      <!-- <v-icon @click="$emit('input', false);" large>mdi-close</v-icon> -->
      <b-container fluid class="px-0">
        <b-row>
          <b-col xs="12" md="6">
            <b-img style="width: 100%; max-height: 600px;" :src="artwork.webImage.url"></b-img>
          </b-col>
          <b-col xs="12" md="6">
            <comments :comments="artwork.comments"></comments>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
    <template v-slot:modal-footer>
      <div style="display: none;" />
    </template>
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
    return {
      windowHeight: null,
      widnowWidth: null
    };
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    })
  },
  methods: {},
  computed: {},
  watch: {
    value(val) {
      if (!val) {
        this.$emit("close", val);
      }
    },
  }
};
</script>
<style>
</style>