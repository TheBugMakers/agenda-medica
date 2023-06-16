<template>
  <v-card flat id="container" class="mx-auto pa-10" style="height: 100vh">
    <v-card-text class="mt-12">
      <h4 class="text-center display-2">Welcome</h4>
      <h6 class="text-center grey--text subtitle-1">Login in your account</h6>
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
          <v-row class="mb-5">
            <v-btn color="blue" dark block tile @click="login">Login</v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-btn text color="blue" @click="setDialog(true)"
          >Don't have an account?</v-btn
        >
        <v-dialog v-model="dialog" max-width="500px" persistent>
          <div v-if="isClient"><ClientsForm /></div>
          <div v-else><reset-password></reset-password></div>
        </v-dialog>
        <v-btn text color="blue" @click="setDialog(false)">Forget your password?</v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import ClientsForm from "@/components/ClientsForm.vue";
import ResetPassword from "@/components/ResetPassword.vue";

export default {
  name: "LoginView",
  data: () => ({
    email: "",
    password: "",
    isClient: null
  }),
  methods: {
    async login() {
      await this.$store.dispatch("authModule/logIn", {
        email: this.email,
        password: this.password,
      });
    },
    setDialog(isClient) {
      this.isClient = isClient
      this.$store.dispatch("setDialog", true);
    },
  },
  components: { ClientsForm, ResetPassword },
  computed: {
    dialog() {
      return this.$store.state.dialog;
    },
  },
};
</script>

<style scoped>
#container {
  height: 100vh;
}
</style>