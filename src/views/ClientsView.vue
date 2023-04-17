<template>
  <div class="pa-3">
    <v-card class="my-3 pa-5 grey lighten-5">
    <v-card-title>
      <div id="textArea" class="mx-n3">
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        outlined
        hide-details
      ></v-text-field>
      </div>
    </v-card-title>
    <v-data-table id="tabela"
      :headers="headers"
      :items="desserts"
      :search="search"
      :height="tableHeight"
    ></v-data-table>
    
  </v-card>
  </div>
</template>
<script>


export default {
  name: "ClientsView",
  data () {
      return {
        tableHeight:'100%',
        search: '',
        headers: [
          {
            text: 'user',
            align: 'start',
            filterable: false,
            value: 'User',
            class: '',
          },
          { text: 'Email', value: 'email' },
          { text: 'Contato', value: 'contatos' },
          { text: 'Created date', value: 'created_dates' },
          { text: 'Numero de relatorios', value: 'numero_relatorios' },
        ],}
      }
}
</script>

<style scoped>
::v-deep .v-data-table-header{
  background-color:#E0E0E0;
}

</style>