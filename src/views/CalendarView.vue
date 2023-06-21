<template>
  <v-card>
    <v-card-title v-if="user.email != 'super@admin.com'"
      ><v-btn color="primary" @click="createAppointment"
        >new appointment</v-btn
      ></v-card-title
    >
    <v-dialog v-model="dialog" persistent max-width="500px"
      ><AppointmentForm></AppointmentForm
    ></v-dialog>
    <v-row class="fill-height ma-1">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small> mdi-chevron-right </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right> mdi-menu-down </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor()"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn
                  v-if="selectedEvent.name == 'pending'"
                  @click="confirm(event)"
                  icon
                >
                  <v-icon>mdi-check-circle-outline</v-icon>
                </v-btn>
                <v-btn
                  v-if="selectedEvent.name == 'pending'"
                  @click="cancel"
                  icon
                >
                  <v-icon>mdi-close-circle-outline</v-icon>
                </v-btn>
                <v-toolbar-title
                  v-html="selectedEvent.name"
                  class="text-center"
                ></v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import AppointmentForm from "@/components/AppointmentForm";

export default {
  name: "CalendarView",
  components: {
    AppointmentForm,
  },
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ["blue", "green", "red", "grey"],
    names: ["Confirmed", "Concluded", "Canceled", "Pending"],
  }),
  computed: {
    dialog() {
      return this.$store.state.dialog;
    },
    userEvents() {
      console.log(
        "USER EVENTS",
        this.$store.state.appointmentModule.appointments
      );
      return this.$store.state.appointmentModule.appointments;
    },
    user() {
      return this.$store.state.authModule.currentUser;
    },
  },
  async created() {
    const currentUser = this.user.id;
    currentUser == "PeB7IIqa6WMKXD8DlBEdFDk3FUi1"
      ? await this.$store.dispatch("appointmentModule/getAppointments")
      : await this.$store.dispatch(
          "appointmentModule/getAppointmentsByUserId",
          currentUser
        );

    const events = [];
    for (var i = 0; i < this.userEvents.length; i++) {
      const event = this.userEvents[i];
      const eventTime = event.time.split(":");
      const eventEnd = `${Number(eventTime[0]) + 1}:${eventTime[1]}`;
      var eventColor = "";
      console.log("EVENT STATUS DO CARALHO ==>>", event);
      if (event.status == "confirmed") {
        eventColor = "blue";
      } else if (event.status == "concluded") {
        eventColor = "green";
      } else if (event.status == "canceled") {
        eventColor = "red";
      } else {
        eventColor = "grey";
      }
      const finalEvenStart = `${event.day} ${event.time}`;
      const finalEventEnd = `${event.day} ${eventEnd}`;
      events.push({
        name: event.status,
        start: finalEvenStart,
        end: finalEventEnd,
        color: eventColor,
        timed: false,
        id: event.id
      });
    }

    console.log("EVENTOOOOOOOOOO", events);
    this.events = events;
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    confirm(event) {
      console.log(event)
      /* this.$store.dispatch("appointmentModule/update", {
        id: this.selectedElement.id,
        status: "confirmed",
      }); */
    },
    cancel() {
      this.$store.dispatch("appointmentModule/update", {
        id: this.selectedElement.id,
        status: "canceled",
      });
    },
    createAppointment() {
      this.$store.dispatch("setDialog", true);
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      if (event == "Confirmed" || event == "confirmed") {
        return "blue";
      } else if (event == "Concluded" || event == "concluded") {
        return "green";
      } else if (event == "Canceled" || event == "canceled") {
        return "red";
      } else {
        return "grey";
      }
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      console.log("EVENT ==>>", event);
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    /* updateRange({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        });
      }

      this.events = events;
    }, */
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>