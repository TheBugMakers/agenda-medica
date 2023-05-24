<template>
  <v-app>
    <v-main class="grey lighten-2" id="container">
      <PublicTemplate v-if="user == null"></PublicTemplate>
      <AdminTemplate v-else></AdminTemplate>
    </v-main>
  </v-app>
</template>

<script>
import AdminTemplate from "@/components/AdminTemplate"
import PublicTemplate from "@/components/PublicTemplate"

export default {
  name: 'App',
  components: {
    AdminTemplate,
    PublicTemplate,

  },
  data: () => ({}),
  computed:{
    user() {
      return this.$store.state.authModule.currentUser
    },
  },
};
</script>

<style>
  #container {
    height: 100%;
  }

</style>