<template>
  <div v-if="loading"></div>
  <div v-else>
    <v-card>
      <v-card-title>
        Clients
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search by name or email"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table  :headers="headers" :items="clients" :search="search" @click:row="getDetail">
        <template v-slot:item.status="{ item }">
          <v-chip :color="statusColor(item.status)">
            {{ item.status }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import SpinnerLoading from "@/components/SpinnerLoading.vue";

export default {
  name: "ClientsView",
  components: {
    SpinnerLoading,
  },
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone", filterable: false },
        { text: "Documents", value: "documents.length", filterable: false },
        { text: "Medicine", value: "medicine.length", filterable: false },
        {
          text: "Appointments",
          value: "appointments.length",
          filterable: false,
        },
        { text: "Status", value: "status", filterable: false },
      ],
      search: ''
    };
  },
  computed: {
    clients() {
      return this.$store.state.clientModule.clients;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  async created() {
    await this.$store.dispatch("clientModule/getClients");
    console.log(this.clients);
  },
  methods: {
    statusColor(status) {
      if (status == "active") {
        return 'green';
      } else if (status == "invited") {
        return 'grey';
      } else {
        return 'red';
      }
    },
    getDetail(item) {
      this.$router.push('/clients/' + item.id)
    }
  },
};
</script>