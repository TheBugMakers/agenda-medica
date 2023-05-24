<template>
  <v-card>
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
                <td>{{ user.name }}</td>
              </tr>
              <tr>
                <td>{{ "Email:" }}</td>
                <td>{{ user.email }}</td>
              </tr>
              <tr>
                <td>{{ "Phone:" }}</td>
                <td>{{ user.phone }}</td>
              </tr>
              <tr v-if="user.documents">
                <td>{{ "Documents:" }}</td>
                <td>{{ user.documents.length }}</td>
              </tr>
              <tr v-if="user.medicine">
                <td>{{ "Medicine:" }}</td>
                <td>{{ user.medicine.length }}</td>
              </tr>
              <tr v-if="user.appointments">
                <td>{{ "Appointments:" }}</td>
                <td>{{ user.appointments.length }}</td>
              </tr>
              <tr>
                <td>{{ "Created date:" }}</td>
                <td>{{ user.created_date }}</td>
              </tr>
              <tr>
                <td>{{ "Status:" }}</td>
                <td>{{ user.status }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="6">
        <div v-if="user.medicine">
          <h4>Medicines</h4>
          <v-data-table
            hide-default-footer
            :headers="medicineHeaders"
            :items="user.medicine"
          >
          </v-data-table>
        </div>
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
        <div v-if="user.documents">
          <h4 class="mt-5">Documents</h4>
          <v-data-table
            hide-default-footer
            :headers="documentsHeaders"
            :items="user.documents"
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
  name: "ProfileView",
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
    user() {
      return this.$store.state.authModule.currentUser;
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
    if (this.$store.state.authModule.currentUser.user_role == "2") {
      await this.$store.dispatch("appointmentModule/getAppointments");
    } else {
      await this.$store.dispatch(
        "appointmentModule/getAppointmentsByUserId",
        this.$store.state.authModule.currentUser.id
      );
    }
    console.log("USER ==>>", this.$store.state.authModule.currentUser);
  },
};
</script>