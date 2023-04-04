<template>
    <div>
        <v-container class="mt-3">
            <v-card>
                <v-row alignt="center" justify="center">
                <v-col cols="12" class="grey lighten-5 rounded-lg border-black">
                    <v-row>
                        <v-col cols="1" class="" xs="12">
                            <v-avatar
                                color="primary"
                                size="100%"
                                class="d-none d-lg-block"
                            >
                            <v-icon dark size="400%">
                            mdi-account-circle
                            </v-icon>
                        </v-avatar>
                        </v-col>
                        <v-col cols="2" class="mt-2">
                            <v-row>
                                <h3 class="mb-1">Usuario User Userio</h3>
                            </v-row>
                            <v-row>
                                <h6 class="mb-1 grey--text">UserTeste@gmail.com</h6>
                            </v-row>
                            <v-row>
                                <v-col cols="1" class="d-flex justify-start">
                                    <v-row class="d-flex justify-start">
                                       <div class="d-flex justify-start">
                                        <v-btn class="ma-2" outlined color="indigo" to="/" small>Voltar</v-btn>
                                       </div>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-col>
                    <v-col cols="3">

                    </v-col>
                    <v-col cols="1" class="">
                        <div class="d-flex flex-column align-start ml-1 grey--text">
                            <div class="d-flex align-start">
                                <v-icon class="mr-1" small color="blue-grey lighten-2 darken-2"> mdi-domain</v-icon><h5>Nome</h5>
                            </div>
                            <div class="d-flex align-start">
                                <v-icon class="mr-1" small color="blue-grey lighten-2 darken-2"> mdi-domain</v-icon> <h5>Status</h5>
                            </div>
                            <div class="d-flex align-start">
                                <v-icon class="mr-1" small color="blue-grey lighten-2 darken-2"> mdi-domain</v-icon> <h5>Telefone</h5>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="2" class="">
                        <div class="d-flex flex-column align-start grey--text">
                            <!-- <v-icon small color="white darken-2"> mdi-domain</v-icon> <h5> teste</h5> -->
                            <h5> Usuario </h5>
                            <h5> OK </h5>
                            <h5> 15 151515-1515 </h5>
                        </div>
                    </v-col>
                    </v-row>
                </v-col>
            </v-row>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>