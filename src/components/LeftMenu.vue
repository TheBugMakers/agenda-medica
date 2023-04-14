<template>
  <!-- O v-model drawer é um boolean que decide se o drawer ficara recolhido ou a mostra, true = a mostra, false = recolhido -->
  <v-navigation-drawer v-model="drawer" app>
    <v-list-item class="blue white--text pb-8">
      <v-list-item-content class="">
        <v-list-item-title class="text-h6 mt-5">
          <v-icon class="white--text">
            fa-hospital
            <!--Apenas mudar depois para o icone do projeto -->
          </v-icon>
          AgendaMed
        </v-list-item-title>
        <v-list-item-subtitle> </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        class="pa-6 mt-2"
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
      <v-list-item></v-list-item>
      <v-list-item class="mt-10">
        <!-- <v-btn depressed color="error"><v-icon class="mr-1">fa-right-from-bracket</v-icon> Exit </v-btn> -->
      </v-list-item>
    </v-list>
    <template v-slot:append>
        <div class="pa-5">
          <v-btn block  color="red" class="white--text">
            <v-icon class="mr-1">fa-right-from-bracket</v-icon> Logout
          </v-btn>
        </div>
      </template>
  </v-navigation-drawer>
</template>

  <script>
export default {
  data() {
    return {
      drawer: true, //Aqui é definido se o drawer estara a mostra
      items: [
        { title: "Clients", icon: "fa-users", route: "/" },
        { title: "Profile", icon: "fa-user-doctor", route: "/" },
        { title: "Calendar", icon: "fa-calendar", route: "/" },
      ],
      right: null,
    };
  },
};
</script>