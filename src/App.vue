<template>
  <v-app>
    <v-main class="grey lighten-3" id="container">
      <LeftMenu></LeftMenu>
      <AdminTemplate v-if="user.data"></AdminTemplate>
      <PublicTemplate v-if="!user.data"></PublicTemplate>
    </v-main>
  </v-app>
</template>

<script>
import AdminTemplate from "@/components/AdminTemplate"
import PublicTemplate from "@/components/PublicTemplate"
import LeftMenu from "@/components/LeftMenu.vue"

export default {
  name: 'App',
  components: {
    AdminTemplate,
    PublicTemplate,
    LeftMenu,
  },
  data: () => ({}),
  computed:{
    user() {
      return this.$store.state.user
    },
  },
};
</script>

<style>
  #container {
    height: 100%;
  }
</style>