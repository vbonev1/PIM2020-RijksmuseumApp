<template>
  <div>
    <b-progress :value="value" :max="max"></b-progress>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item href="#">
          <b-img :src="require('@/assets/rijksmuseum-logo-combined.png')" width="300" height="50"></b-img>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template v-slot:text>
            <b-icon icon="person" />
          </template>
          <b-dropdown-item href="#">Account</b-dropdown-item>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
          <b-dropdown-item href="#">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    value: 0,
    max: 100
  }),
  methods: {
    visualizeProgress() {
      this.value = 0;
      let interval = setInterval(() => (this.value += 25), 50);
      if (this.value == 100) {
        clearInterval(interval);
      }
    }
  },
  mounted() {
    this.visualizeProgress();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
