<template>
  <v-row id="container" dense>
           <v-col class="pb-0"  cols="2">
             <LeftMenu></LeftMenu>
           </v-col>
           <v-col class="mt-4">
             <v-sheet color="transparent">
             <router-view></router-view>
             </v-sheet>
           </v-col>
         </v-row>
 </template>
 
 <script>
 import LeftMenu from './LeftMenu.vue';
 export default {
 
   components: {
     LeftMenu,
   },
 }
 </script>