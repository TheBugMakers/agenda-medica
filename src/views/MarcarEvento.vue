<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Addicionar Evento
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ dialogTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="event.title"
              label="Titulo de evento"
              required
              :rules="eventTitleRules"
            ></v-text-field>
            <v-text-field
              v-model="event.start"
              label="Começo"
              type="datetime-local"
              required
              :rules="eventStartRules"
            ></v-text-field>
            <v-text-field
              v-model="event.end"
              label="Fim"
              type="datetime-local"
              required
              :rules="eventEndRules"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="cancelEvent">Cancelar</v-btn>
          <v-btn color="primary" text @click="saveEvent">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      dialog: false,
      event: {
        title: '',
        start: '',
        end: ''
      },
      eventTitleRules: [
        v => !!v || 'Necessario titulo de evento'
      ],
      eventStartRules: [
        v => !!v || 'Necessario momento de inicio'
      ],
      eventEndRules: [
        v => !!v || 'Necessario momento de finalização',
        v => this.validarAgendamento(v) || 'O fim do evento deve se após seu começo'
      ]
    };
  },
  computed: {
    perguntarAção() {
      return this.event.id ? 'Editar Evento' : 'Adicionar Evento';
    }
  },
  methods: {
    validarAgendamento(endDate) {
      return new Date(endDate) > new Date(this.event.start);
    },
    cancelarEvento() {
      this.dialog = false;
    },
    salvarEvento() {
      this.$refs.form.validate().then(valid => {
        if (valid) {
          this.dialog = false;
          this.$emit('evento-adicionado', this.event);
        }
      });
    }
  }
};
</script>
