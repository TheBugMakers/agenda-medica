<template>
  <v-snackbar
     :value="visible"
     :color="this.color"
     absolute
     right
     rounded="pill"
     top
   >
   <v-avatar><v-icon>{{ this.icon }}</v-icon></v-avatar>
     {{ this.text }}
   </v-snackbar>
</template>

<script>
 export default {
  name: "ErrorAlert",
  props: ["text", "icon", "color", "visible"],
 }
</script>