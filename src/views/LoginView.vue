<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card-text class="mt-12">
          <h4 class="text-center">Login</h4>
          <h6 class="text-center grey--text">Logar na sua conta</h6>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8">
              <v-text-field
                label="Email"
                outlined
                dense
                color="blue"
                autocompleto="false"
                class="mt-16"
              ></v-text-field>
              <v-text-field
                label="senha"
                outlined
                dense
                color="blue"
                autocomplete="false"
                type="password"
              ></v-text-field>
              <v-row>
                <v-col cols="12" sm="7">
                  <v-checkbox
                    label="Lembrar login"
                    class="mt-n1"
                    color="blue"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="5">
                  <span class="caption blue--text">Esqueceu sua senha?</span>
                </v-col>
                <v-btn color="blue" dark block tile to="/profile">Logar</v-btn>
                <!-- <h5 class="text-center grey--text mt-4 mb-3">Outras formas de login</h5> -->
              </v-row>
              <v-row> </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    step: 1,
  }),
};
</script>
<style>
</style>