<template>
  <v-card>
    <v-card-title>Client: {{ client.name }}</v-card-title>
    <v-row class="ma-2">
      <v-col cols="6">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Item</th>
                <th class="text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ "Name:" }}</td>
                <td>{{ client.name }}</td>
              </tr>
              <tr>
                <td>{{ "Email:" }}</td>
                <td>{{ client.email }}</td>
              </tr>
              <tr>
                <td>{{ "Phone:" }}</td>
                <td>{{ client.phone }}</td>
              </tr>
              <tr>
                <td>{{ "Documents:" }}</td>
                <td>{{ client.documents.length }}</td>
              </tr>
              <tr>
                <td>{{ "Medicine:" }}</td>
                <td>{{ client.medicine.length }}</td>
              </tr>
              <tr>
                <td>{{ "Appointments:" }}</td>
                <td>{{ client.appointments.length }}</td>
              </tr>
              <tr>
                <td>{{ "Birth date:" }}</td>
                <td>{{ client.birth_date }}</td>
              </tr>
              <tr>
                <td>{{ "Created date:" }}</td>
                <td>{{ client.created_date }}</td>
              </tr>
              <tr>
                <td>{{ "Status:" }}</td>
                <td>{{ client.status }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="6">
        <div v-if="client.medicine.length > 0">
          <h4>Medicines</h4>
          <v-data-table
            hide-default-footer
            :headers="medicineHeaders"
            :items="client.medicine"
          >
          </v-data-table>
        </div>
        <div v-if="appointments">
          <h4 class="mt-5">Appointments</h4>
          <v-data-table
            hide-default-footer
            :headers="appointmentHeaders"
            :items="appointments"
            @click:row="getAppointmentDetail"
          >
            <template v-slot:item.status="{ item }">
              <v-chip :color="statusColor(item.status)">
                {{ item.status }}
              </v-chip>
            </template>
          </v-data-table>
        </div>
        <div v-if="client.documents.length > 0">
          <h4 class="mt-5">Documents</h4>
          <v-data-table
            hide-default-footer
            :headers="documentsHeaders"
            :items="client.documents"
            @click:row="getDocumentDetail"
          >
          </v-data-table>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "ClientDetail",
  data: () => {
    return {
      medicineHeaders: [
        { text: "Name", value: "name" },
        { text: "Doctor", value: "doctor" },
        { text: "Dose", value: "dose" },
        { text: "Start", value: "start" },
        { text: "Finish", value: "finish" },
      ],
      appointmentHeaders: [
        { text: "Day", value: "day" },
        { text: "Time", value: "time" },
        { text: "Status", value: "status" },
      ],
      documentsHeaders: [
        { text: "Type", value: "type" },
        { text: "Name", value: "name" },
      ],
    };
  },
  computed: {
    client() {
      return this.$store.state.clientModule.selectedClient;
    },
    appointments() {
      return this.$store.state.appointmentModule.appointments;
    },
  },
  methods: {
    statusColor(status) {
      if (status == "concluded") {
        return "green";
      } else if (status == "confirmed") {
        return "blue";
      } else if (status == "canceled") {
        return "red";
      } else {
        return "grey";
      }
    },
    getAppointmentDetail(item) {
      if (item.status == "concluded") {
        window.open(item.report);
      } else {
        console.log("Error: the selected appointment status is " + item.status);
      }
    },
    getDocumentDetail(item) {
      console.log("document", item.link);
      window.open(item.link);
    },
  },
  async created() {
    await this.$store.dispatch(
      "clientModule/getClientById",
      this.$route.params.client_id
    );
    await this.$store.dispatch(
      "appointmentModule/getAppointmentsByUserId",
      this.$route.params.client_id
    );
    console.log("selected client ==>>", this.client);
  },
};
</script>