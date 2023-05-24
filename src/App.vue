<template>
  <v-app>
    <v-main class="grey lighten-3" id="container">
      <AdminTemplate v-if="user.data"></AdminTemplate>
      <PublicTemplate v-if="!user.data"></PublicTemplate>
      
      
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