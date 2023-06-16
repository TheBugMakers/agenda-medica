<template>
  <v-card>
    <v-card-text>
      <v-card-title> Edit phone number </v-card-title>
      <v-text-field
        space-around
        v-model="phone"
        type="phone"
        name="phone"
        :rules="[() => !!phone || 'This field is required']"
        label="Phone"
        placeholder="(15) 999111222"
        value
        required
        outlined
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary" @click="Cancel"> Cancel </v-btn>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="Edit"> Save </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "EditUser",
  data() {
    return {
      phone: null,
    };
  },
  methods: {
    async Edit() {
      try {
        let user = this.$store.state.authModule.currentUser;
        let isAdmin = {
          col: "doctor",
          id: "PeB7IIqa6WMKXD8DlBEdFDk3FUi1",
          data: { phone: this.phone },
        };
        let isClient = {
          col: "client",
          id: user.id,
          data: { phone: this.phone },
        };
        user.id == "PeB7IIqa6WMKXD8DlBEdFDk3FUi1"
          ? this.$store.dispatch("updatePhone", isAdmin)
          : this.$store.dispatch("updatePhone", isClient);
        console.log("ENTROU NO EDIT");
      } catch (e) {
        console.log(e);
      } finally {
        location.reload()
      }
    },
    Cancel() {
      this.$store.dispatch("setDialog", false);
    },
  },
};
</script>