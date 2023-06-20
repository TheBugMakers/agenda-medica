<template>
  <v-card>
    <v-card-text>
      <v-card-title>Add appointment</v-card-title>
      <v-date-picker
      v-model="date"
      :events="openDates"
      event-color="green lighten-1"
    ></v-date-picker>
    <div v-if="this.date != ''">
      <v-select
          :items="openHours"
          outlined
          label="Select hour"
          v-model="time"
        ></v-select>
    </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary" @click="closeDialog">
        Cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :loading="this.loading" text color="primary" @click="register">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AppointmentForm",
  data() {
    return {
      date: '',
      openDates: [],
      openHours: [],
      items: [],
      time: ''
    };
  },
  computed: {
    dates() {
      return this.$store.state.dates;
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    closeDialog() {
      this.$store.dispatch("setDialog", false);
    },
    async register() {
      var d = {
        day: this.date,
        time: this.time,
        status: 'pending',
        client: this.$store.state.authModule.currentUser.id
      }
      console.log('DATE ==>>', d)
      this.$store.dispatch('appointmentModule/createAppointment', {
        data: d,
        id: this.$store.state.authModule.currentUser.id
      })
    },
  },
  async created() {
    await this.$store.dispatch('getDates')
    console.log('bbbbbbbbbbbbbb', this.dates)
    var finalEvents = []
    var finalHour = []
    for(var i = 0; i < this.dates.length; i++) {
      var h = this.dates[i].toDate().toISOString().substr(11, 5)
      var d = this.dates[i].toDate().toISOString().substr(0, 10)
      finalEvents.push(d)
      finalHour.push(h)
    }

    this.openDates = finalEvents;
    this.openHours = finalHour;
    console.log('DATE', this.openDates)
    console.log('HOUR', this.openHours)
  }
};
</script>