<template>
  <b-modal centered size="lg" :title="artwork.longTitle" v-model="value" @keydown.esc="$emit('close', false)">
    <b-card height="100%">
      <!-- <v-icon @click="$emit('input', false);" large>mdi-close</v-icon> -->
      <b-container>
        <b-row>
          <b-col xs="6">
            <b-img
              style="position: sticky; top: 0"
              :src="artwork.webImage.url"
              width="400px"
              height="500px"
            ></b-img>
          </b-col>
          <b-col xs="6"></b-col>
        </b-row>
      </b-container>
    </b-card>
  </b-modal>
</template>


<script>
export default {
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
      console.log(this.artwork);
      if (!val) {
        this.$emit("close", val);
      }
    }
  }
};
</script>
<style>
.modal-dialog {
  height: 600px !important;
}
</style>