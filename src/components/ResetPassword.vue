<template>
  <v-card>
    <v-btn text top right absolute @click="closeDialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-card-text>
      <v-card-title>Reset passwrod</v-card-title>
      <v-text-field
        space-around
        v-model="password"
        type="password"
        name="password"
        :rules="[() => password || 'This field is required']"
        label="New password"
        placeholder="p@ssw0rd"
        value
        required
        outlined
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :loading="this.loading" text color="primary" @click="register">
        Register
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ResetPassword",
  data() {
    return {
      password: ''
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
      if (
        this.password != '' 
      ) {
        await this.$store.dispatch("authModule/resetPassword", this.password);
      } else {
        this.$store.dispatch("setDialog", false);
      }
    },
  },
};
</script>