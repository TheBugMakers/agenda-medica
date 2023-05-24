<template>
  <v-row>
    <v-col class="pb-0" cols="2">
      <LeftMenu></LeftMenu>
    </v-col>
    <v-col>
      <router-view class="mt-5 mr-5 ml-n8"></router-view>
    </v-col>
  </v-row>
</template>
 
 <script>
import LeftMenu from "@/components/LeftMenu.vue";
export default {
  components: {
    LeftMenu,
  },
};
</script>