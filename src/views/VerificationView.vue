<template>
  <v-card flat id="container" class="mx-auto pa-10" style="height: 100vh">
    <v-text-field
      type="email"
      v-model="email"
      :rules="[() => !!password || 'This field is required']"
      outlined
      label="Email"
      prepend-inner-icon="mdi-email"
      required
    ></v-text-field>
    <v-text-field
      type="password"
      v-model="password"
      :rules="[() => !!password || 'This field is required']"
      outlined
      label="Password"
      prepend-inner-icon="mdi-lock"
      required
    ></v-text-field>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="create"> Create password </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "VerificationView",
  data() {
    return {
      password: "",
      email: null,
    };
  },
  methods: {
    async create() {
      await this.$store.dispatch("authModule/createUserFromSigninLink", {
        password: this.password,
        email: this.email,
        url: window.location.href,
      })
      this.$router.push({ name: "calendar" });
    },
  },
};
</script>