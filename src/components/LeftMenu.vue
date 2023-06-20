<template>
  <v-card width="200" id="menu" flat height="100vh">
    <v-card-title> <v-img src="@/assets/logo.png" width="10" class="ma-2 ml-n1"></v-img>AgendaMED</v-card-title>
    <v-divider></v-divider>
    <v-list flat class="ml-3 pt-12">
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(item, i) in menu"
          :key="i"
          class="ma-2"
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-card-actions class="ml-8" style="position: absolute; bottom: 0">
      <v-btn text @click="logout">Logout</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      right: null,
    };
  },
  computed: {
    menu() {
      return this.$store.state.authModule.menu
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("authModule/logOut");
    },
  },
};
</script> 

<style>
  #menu {
    position: fixed;
  }
</style>