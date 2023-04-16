<template>
  <div class="pa-2">
    <v-card class="my-1 pa-2">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
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
  background-color:#BBDEFB;
}
</style>