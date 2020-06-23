<template>
  <div>
    <b-form @submit="login()">
      <b-form-group
        id="input-group-1"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="user.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="user.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          email: '',
          password: '',
        },
        show: true
      }
    },
    methods: {
      login(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.user))
      },
    }
  }
</script>