<template>
  <div v-if="loading">
    <spinner-loading></spinner-loading>
  </div>
  <div v-else>
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
                  <v-dialog v-model="dialog" max-width="500px" persistent>
                    <edit-user />
                  </v-dialog>
                  <v-btn icon color="primary" @click="edit"
                    ><v-icon>mdi-pencil</v-icon></v-btn
                  >
                </tr>
                <tr v-if="user.documents">
                  <td>{{ "Documents:" }}</td>
                  <td>{{ user.documents.length }}</td>
                </tr>
                <tr v-if="user.medicine">
                  <td>{{ "Medicine:" }}</td>
                  <td>{{ user.medicine.length }}</td>
                </tr>
                <tr>
                  <td>{{ "Appointments:" }}</td>
                  <td>{{ user.appointments.length }}</td>
                </tr>
                <tr>
                  <td>{{ "Created date:" }}</td>
                  <td>{{ convertCreatedDate(user.created_date) }}</td>
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
          <div v-if="user.medicine && user.medicine.length > 0">
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
          <div v-if="user.documents && user.documents.length > 0">
            <h4 class="mt-5">Documents</h4>
            <v-data-table
              hide-default-footer
              :headers="documentsHeaders"
              :items="user.documents"
              @click:row="getDocumentDetail"
            >
              <template v-slot:item.status="{ item }">
                <v-chip outlined :color="typeColor(item.type)">
                  {{ item.status }}
                </v-chip>
              </template>
            </v-data-table>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import SpinnerLoading from "@/components/SpinnerLoading.vue";
import EditUser from "@/components/EditUser.vue";

export default {
  name: "ProfileView",
  components: {
    SpinnerLoading,
    EditUser,
  },
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
    loading() {
      return this.$store.state.loading;
    },
    dialog() {
      return this.$store.state.dialog;
    },
  },
  methods: {
    convertCreatedDate(created_date) {
      if (created_date != null) {
        const data = new Date(created_date);
        let dia = data.getDate().toString();
        let diaF = dia.length == 1 ? "0" + dia : dia;
        let mes = (data.getMonth() + 1).toString();
        let mesF = mes.length == 1 ? "0" + mes : mes;
        let anoF = data.getFullYear();
        const finalDate = `${diaF}/${mesF}/${anoF}`;
        return finalDate;
      } else {
        return "undefined";
      }
    },
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
    typeColor(type) {
      if (type == "Medicine" || type == "medicine") {
        return "blue";
      } else {
        return "orange";
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
    edit() {
      this.$store.dispatch("setDialog", true);
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