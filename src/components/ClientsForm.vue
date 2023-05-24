<template>
  <v-card>
    <v-btn text top right absolute @click="closeDialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-card-text>
      <v-card-title>Register</v-card-title>
      <v-text-field
        space-around
        v-model="name"
        type="name"
        name="name"
        :rules="[() => name || 'This field is required']"
        label="Name"
        placeholder="João"
        value
        required
        outlined
      ></v-text-field>
      <v-text-field
        type="email"
        name="email"
        v-model="email"
        :rules="[() => email || 'This field is required']"
        label="Email"
        placeholder="joao@silva.com"
        value
        required
        outlined
      ></v-text-field>
      <v-text-field
        type="birth_date"
        name="birth_date"
        v-model="birth_date"
        :rules="[() => birth_date || 'This field is required']"
        label="Birth date"
        placeholder="25/07/2002"
        value
        required
        outlined
      ></v-text-field>
      <v-text-field
        type="phone"
        name="phone"
        v-model="phone"
        :rules="[() => phone || 'This field is required']"
        label="Phone number"
        placeholder="999123456"
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
import ClientModel from '@/models/ClientModel';
export default {
  name: "ClientsForm",
  data() {
    return {
      name: "",
      email: "",
      birth_date: "",
      phone: "",
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
        this.name != '' &&
        this.email != '' &&
        this.birth_date != '' &&
        this.phone != ''
      ) {
        const user = new ClientModel({
          name: this.name,
          email: this.email,
          status: 'invited',
          birth_date: this.birth_date,
          phone: this.phone
          });
        await this.$store.dispatch("authModule/createUser", user);
      } else {
        this.$store.dispatch("setDialog", false);
        this.$store.dispatch(
          "loadError",
          "Error in create new client: all the fields are required"
        );
      }
    },
  },
};
</script>