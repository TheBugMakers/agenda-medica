<template>
  <v-container fluid>
    <v-row style="min-height: 400px">
      <v-col cols="3" min-width="300px">
        <v-timeline dense style="min-height: 400px">
          <v-timeline-item
            v-for="(event, index) in events"
            :key="index"
            :color="event.color"
          >
            {{ event.name }}<br>{{ event.start }}
          </v-timeline-item>
        </v-timeline>
      </v-col>
      <v-col cols="9" min-width="500px">
        <v-card class="mx-2" outlined style="min-height: 400px">
          <v-card-text>
            <v-calendar
              v-model="selectedDate"
              color="primary"
              type="month"
              :events="events"
              @click:event="showEvent"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default 
{
  name: "CalendarView",
  data() 
  {
    return {
      selectedDate: null,
      events: [
        {
        name: 'Teste',
        start: '2023-04-10',
        end: '2023-04-10',
        color: 'orange'
        },
        {
        name: 'Teste',
        start: '2023-04-15',
        end: '2023-04-16',
        color: 'blue'
        }
      ]
    }
  },
  methods: {
    showEvent(event) {
      alert(`Event: ${event.name}\nStart: ${event.start}\nEnd: ${event.end}`);
    }
  }
}
</script>

<style scoped>
.v-card__text {
  padding: 10px;
}
.mx-2 {
  margin: 10px;
}
@media (max-width: 900px) {
  .v-row {
    flex-wrap: nowrap;
  }
  .v-col {
    flex-grow: 1;
    max-width: 100%;
  }
  .v-col[min-width="300px"] {
    min-width: 300px;
  }
  .v-col[min-width="500px"] {
    min-width: 500px;
  }
}
</style>