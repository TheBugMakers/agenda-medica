<template>
  <div>
    <v-row>
      <v-col
        class="pb-0"
        cols="8"
        style="display: flex; justify-content: center"
      >
        <div id="div">
          <v-row>
            <v-col>
              <div class="mb-5">
                <p style="font-size: 40px; font-weight: 600">
                  VRI management system
                </p>
                <h2>5D Ecography</h2>
              </div>
              <v-row
                align="center"
                class="mb-2"
                v-for="service in services"
                :key="service.icon"
              >
                <v-col cols="2">
                  <v-avatar size="36px" color="#CE5EDC">
                    <v-icon dark size="16px">
                      {{ service.icon }}
                    </v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="10">
                  <strong></strong>
                  <span class="">{{ service.text }} </span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col class="pb-0" cols="4">
        <login-view></login-view>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LoginView from "@/views/LoginView.vue";

export default {
  data: () => ({
    services: [
      {
        icon: "mdi-google-analytics",
        text: "Data analytics",
      },
      {
        icon: " mdi-calendar",
        text: "Online Scheduling",
      },
      {
        icon: "mdi-hospital-box",
        text: "Clinical management",
      },
      {
        icon: " mdi-account-circle",
        text: "Resulting",
      },
    ],
  }),
  components: {
    LoginView,
  },
};
</script>

<style>
#div {
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
}
</style>