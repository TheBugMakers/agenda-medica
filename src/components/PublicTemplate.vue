<template>
  <v-row class="mt-n3">
    <v-col class="pb-0" cols="8" style="display: flex; justify-content: center">
      <div id="div">
        <v-row>
          <v-col>
            <div class="mb-5">
              <v-row>
                <img src="@/favicon.png" width="50" height="60" alt="" class="mr-6 ml-3"/>
                <p style="font-size: 40px; font-weight: 600">Agenda MED</p>
              </v-row>
              <h2>Medical appointment system</h2>
            </div>
            <v-row
              align="center"
              class="mb-2"
              v-for="service in services"
              :key="service.icon"
            >
              <v-col cols="2">
                <v-avatar size="36px" color="#1F87FF">
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
      <VerificationView v-if="this.$route.name == 'verification'"></VerificationView>
      <LoginView v-else></LoginView>
      <v-dialog v-model="dialog" max-width="500px" persistent>
        <ClientsForm></ClientsForm>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import LoginView from "@/views/LoginView.vue";
import ClientsForm from '@/components/ClientsForm.vue';
import VerificationView from "@/views/VerificationView.vue";

export default {
  data: () => ({
    services: [
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
    ClientsForm,
    VerificationView
  },
  computed: {
    dialog() {
      return this.$store.state.dialog;
    },
  },
};
</script>

<style>
#div {
  display: flex;
  color: #1f87ff;
  align-items: center;
  justify-content: center;
}
</style>