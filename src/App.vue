<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
    <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Psico Clinic help</v-toolbar-title>
    </v-app-bar> -->
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
      app
    >
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Help Clinicas</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
        left
        bottom
      >


        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
    <v-footer padless>
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>Bug-makers</strong>
    </v-col>
    <v-col class="text-center align-center"
      cols="12">
      <v-btn class="mx-2 primary" href="https://github.com/TheBugMakers"
          dark
          icon >
          <v-icon size="24px">mdi-github</v-icon>
      </v-btn>
      <v-btn class="mx-2 primary" dark icon href="https://trello.com/b/bNdXOCly/bugmakers">
        <v-icon size="24px">fab fa-trello</v-icon>
      </v-btn>
    </v-col>
  </v-footer>
  </v-app>
</template>

<script>

  export default {
  components: {},
    data () {
      return {
        drawer: null,
        items: [
          { title: 'Principal', icon: 'mdi-view-dashboard' },
          { title: 'Quem somos', icon: 'mdi-help-box' },
        ],
        right: null,
      }
    },
  }
</script>