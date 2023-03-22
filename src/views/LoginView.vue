<template>
  <div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10">
          <v-card class="elevation-6 mt-10">
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-card-text class="mt-12">
                      <h4 class="text-center">Login</h4>
                      <h6 class="text-center grey--text">Logar na sua conta</h6>
                      <v-row align="center" justify="center">
                        <v-col cols="12" sm="8">
                          <v-text-field label="Email" outlined dense color="blue" autocompleto="false" class="mt-16"></v-text-field>
                          <v-text-field label="senha" outlined dense color="blue" autocomplete="false" type="password"></v-text-field>
                          <v-row>
                            <v-col cols="12" sm="7">
                              <v-checkbox label="Lembrar login" class="mt-n1" color="blue"></v-checkbox>
                            </v-col>
                            <v-col cols="12" sm="5">
                              <span class="caption blue--text">Esqueceu sua senha?</span>
                            </v-col>
                            <v-btn color="blue" dark block tile>Logar</v-btn>
                            <h5 class="text-center grey--text mt-4 mb-3">Outras formas de login</h5>
                          </v-row>
                          <v-row>
                            <v-btn depressed outlined color="grey" class="mb-2">
                              <v-icon color="red">fab fa-google</v-icon>
                            </v-btn>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" sm="6" class="blue">
                    <div style="text-align:center; padding: 180px 0;">
                      <v-card-text class="white--text">
                        <h3 class="center">Não tem uma conta? Se cadastre aqui</h3>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn tile outlined dark @click="step++" class="white blue--text">Cadastrar</v-btn>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item :value="2">
                <v-row>
                  <v-col cols="12" sm="6" class="blue">
                    <div style="text-align: center; padding: 180px 0;">
                      <v-card-text class="white--text">
                        <h3 class="text-center">Logar</h3>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn tile outlined dark @click="step--">Logar</v-btn>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="white">
                    <v-card-text class="mt-12">
                      <h3 class="text-center"> Crie uma conta</h3>
                      <h6 class="text-center grey--text">vamos criar sua conta</h6>
                      <v-row align="center" justify="center">
                        <v-col cols="12" sm="8">
                          <v-row>
                            <v-col cols="12" sm="6">
                              <v-text-field outlined label="primeiro nome" color="blue" dense></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-text-field outlined label="Sobrenome" color="blue" dense></v-text-field>
                            </v-col>
                          </v-row>
                          <v-text-field outlined label="email" color="blue"></v-text-field>
                          <v-text-field outlined label="senha" color="blue" type="password"></v-text-field>
                          <v-row>
                            <v-col cols="12" sm="7">
                              <v-checkbox label="Aceitar termos" class="mt-n1" color="blue"></v-checkbox>
                            </v-col>
                            
                            <v-col cols="12" sm="7">
                              <span class="caption blue--text ml-n4"> Termos e condições </span>
                            </v-col>
                          </v-row>
                          <v-btn color="blue" dark block tile>Cadastrar</v-btn>
                        </v-col>

                      </v-row>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {

  data: ()=>({
    step: 1
  })
}
</script>
<style>
</style>