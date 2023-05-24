<template>
  <v-snackbar
     :value="visible"
     :color="this.color"
     absolute
     right
     rounded="pill"
     top
   >
   <v-icon>{{ this.icon }}</v-icon>
     {{ this.text }}
   </v-snackbar>
</template>

<script>
 export default {
  name: "ErrorAlert",
  props: ["text", "icon", "color", "visible"],
 }
</script>