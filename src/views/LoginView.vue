<template>
  <v-card flat id="container" class="mx-auto pa-10"
  style="height: 100vh">
    <v-card-text class="mt-12">
      <h4 class="text-center display-2">Welcome</h4>
      <h6 class="text-center grey--text subtitle-1">Logon in your account</h6>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8">
          <v-text-field
            label="Email"
            outlined
            dense
            color="blue"
            autocompleto="false"
            class="mt-16"
            v-model="email"
          ></v-text-field>
          <v-text-field
            label="password"
            outlined
            dense
            color="blue"
            autocomplete="false"
            type="password"
            v-model="password"
          ></v-text-field>
          <v-row>
            <v-col cols="12" sm="7">
              <v-checkbox
                label="Remember me"
                class="mt-n1"
                color="blue"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="5">
              <span class="caption blue--text">Forgot your password?</span>
            </v-col>
            <v-btn color="blue" dark block tile @click="login">Login</v-btn>
          </v-row>
          <v-row> </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "LoginView",
  data: () => ({
    email: '',
    password: ''
  }),

  methods: {
    async login() {
      await this.$store.dispatch('clientModule/login', {
        email: this.email, password: this.password
      })
    }
  }
};
</script>

<style scoped>
#container {
  height: 100vh;
}
</style>