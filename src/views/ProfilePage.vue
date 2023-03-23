<template>
    <div>
        <v-container class="mt-3">
            <v-row alignt="center" justify="center">
                <v-col cols="12" class="blue-grey lighten-5 rounded-lg">
                    <v-row>
                        <v-col cols="1">
                            <v-avatar
                                color="primary"
                                size="70"
                            >
                            <v-icon dark size="60">
                            mdi-account-circle
                            </v-icon>
                        </v-avatar>
                        </v-col>
                        <v-col cols="2" class="mt-2">
                            <v-row>
                                <h3 class="mb-1">Usuario User Userio</h3>
                            </v-row>
                            <v-row>
                                <h6 class="mb-1">UserTeste@gmail.com</h6>
                            </v-row>
                            <v-row>
                                <v-col cols="12" class="">
                                    <v-row>
                                       <div class="d-flex justify-space-between">
                                        <v-btn outlined class="mt-1 white" color="primary" depressed small><router-link to="/" class="text-decoration-none">Go to Home</router-link></v-btn>
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
        </v-container>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>