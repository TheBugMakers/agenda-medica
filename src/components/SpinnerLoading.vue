<template>
  <div id="spinner">
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
</template>

<script>
  export default {
    name: 'spinnerLoading',
  }
</script>

<style>
  #spinner{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
  }
</style>