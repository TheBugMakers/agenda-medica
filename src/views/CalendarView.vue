<template>
  <v-app>
    <v-main>
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
                  @click:event="emEventoClick"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn color="primary" @click="openDialog">Adicionar Evento</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title>
          <span v-if="dialogStep === 1">Nome do Evento</span>
          <span v-else-if="dialogStep === 2">Data e Hora de Início</span>
          <span v-else-if="dialogStep === 3">Data e Hora de Fim</span>
          <span v-else>Confirmar Evento</span>
        </v-card-title>
        <v-card-text>
          <v-row v-if="dialogStep === 1">
            <v-col cols="12">
              <v-text-field v-model="newEvent.name" label="Nome do Evento"></v-text-field>
            </v-col>
          </v-row>
          <v-row v-else-if="dialogStep === 2">
            <v-col cols="12">
              <v-date-picker v-model="newEvent.startDate"></v-date-picker>
            </v-col>
            <v-col cols="12">
              <v-time-picker v-model="newEvent.startTime"></v-time-picker>
            </v-col>
          </v-row>
          <v-row v-else-if="dialogStep === 3">
            <v-col cols="12">
              <v-date-picker v-model="newEvent.endDate"></v-date-picker>
            </v-col>
            <v-col cols="12">
              <v-time-picker v-model="newEvent.endTime"></v-time-picker>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <div><strong>Nome do Evento:</strong> {{ newEvent.name }}</div>
              <div><strong>Data de Início:</strong> {{ newEvent.startDate }}</div>
              <div><strong>Hora de Início:</strong> {{ newEvent.startTime }}</div>
              <div><strong>Data de Fim:</strong> {{ newEvent.endDate }}</div>
              <div><strong>Hora de Fim:</strong> {{ newEvent.endTime }}</div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="cancelDialog">Cancelar</v-btn>
          <v-btn @click="prevDialogStep" v-if="dialogStep > 1">Anterior</v-btn>
          <v-btn @click="nextDialogStep" v-if="dialogStep < 4">Próximo</v-btn>
          <v-btn @click="addEvent" v-else>Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title>Excluir evento</v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir este evento?
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="deleteEvent">Excluir</v-btn>
          <v-btn @click="deleteDialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      events: [],
      deleteDialog: false,
      selectedEvent: null,
      dialog: false,
      dialogStep: 1,
      newEvent: {
        name: '',
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null
      }
    };
    
  },
  methods: {
    emEventoClick({ event }) {
      this.selectedEvent = event;
      this.deleteDialog = true;
    },
    deleteEvent() {
      const index = this.events.indexOf(this.selectedEvent);
      if (index > -1) {
        this.events.splice(index, 1);
      }
      this.selectedEvent = null;
      this.deleteDialog = false;
    },
    openDialog() {
      this.dialog = true;
      this.dialogStep = 1;
      this.newEvent.name = '';
      this.newEvent.startDate = null;
      this.newEvent.startTime = null;
      this.newEvent.endDate = null;
      this.newEvent.endTime = null;
    },
    cancelDialog() {
      this.dialog = false;
    },
    prevDialogStep() {
      this.dialogStep--;
    },
    nextDialogStep() {
      this.dialogStep++;
    },
    addEvent() {
      if (!this.newEvent.name || !this.newEvent.startDate || !this.newEvent.startTime || !this.newEvent.endDate || !this.newEvent.endTime) {
        alert('Por favor, preencha todos os campos do evento.');
        return;
      }

      const event = {
        name: this.newEvent.name,
        start: new Date(this.newEvent.startDate + ' ' + this.newEvent.startTime),
        end: new Date(this.newEvent.endDate + ' ' + this.newEvent.endTime)
      };
      
      this.events.push(event);
      
      this.dialog = false;
    },
    removePastEvents() {
      setInterval(() => {
        const now = new Date();
        this.events = this.events.filter(evento => new Date(evento.fim) > now);
      }, 3600000);
    },
  },
  mounted() {
    this.removePastEvents();
  }
};
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