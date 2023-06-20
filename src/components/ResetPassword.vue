<template>
  <v-card>
    
    <v-btn text top right absolute @click="closeDialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-card-text>
      <v-card-title>Send reset password email</v-card-title>
      <v-text-field
        space-around
        v-model="email"
        type="email"
        name="email"
        :rules="[() => email || 'This field is required']"
        label="Email"
        placeholder="john@doe.com"
        value
        required
        outlined
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :loading="this.loading" text color="primary" @click="register">
        Reset
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ResetPassword",
  data() {
    return {
      email: "",
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    closeDialog() {
      this.$store.dispatch("setDialog", false);
    },
    async register() {
      if (this.email != "") {
        await this.$store.dispatch("authModule/resetPassword",this.email);
      } else {
        this.$store.dispatch("setDialog", false);
        this.$store.dispatch("setAlert", {text: 'Error: all fields are required', icon: 'mdi-account-alert', color: "red"})
      }
    },
  },
};
</script>