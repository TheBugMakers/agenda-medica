<template>
  <div>
    <div v-if="loading == true">
      <v-card>
        <spinnerLoading />
      </v-card>
    </div>
    <div v-if="loading == false">
      <v-card>
        <v-card-text>
          <v-card-title>
            <v-switch class="mr-10" v-model="isMedicine"></v-switch>
            <div v-if="isMedicine">Upload a medicine file</div>
            <div v-else>Upload a report</div>
          </v-card-title>
          <v-file-input
            v-model="File"
            type="file"
            label="Choose your file"
            outlined
          ></v-file-input>
          <div v-if="isMedicine">
            <v-text-field
              space-around
              v-model="name"
              type="name"
              name="name"
              :rules="[() => !!name || 'This field is required']"
              label="Name"
              placeholder="Rivotril"
              value
              required
              outlined
            ></v-text-field>
            <v-text-field
              space-around
              v-model="dose"
              type="dose"
              name="dose"
              :rules="[() => !!dose || 'This field is required']"
              label="Dose"
              placeholder="10 gotas, 12/12hrs"
              value
              required
              outlined
            ></v-text-field>
            <v-text-field
              space-around
              v-model="start"
              type="start"
              name="start"
              :rules="[() => !!start || 'This field is required']"
              label="Start"
              placeholder="29/05/2023"
              value
              required
              outlined
            ></v-text-field>
            <v-text-field
              space-around
              v-model="end"
              type="end"
              name="end"
              :rules="[() => !!end || 'This field is required']"
              label="End"
              placeholder="10/09/2023"
              value
              required
              outlined
            ></v-text-field>
            <v-switch
              class="mt-n3"
              label="Another doctor"
              v-model="anotherDoctor"
            ></v-switch>
            <v-text-field
              v-if="anotherDoctor"
              space-around
              v-model="doctor"
              type="doctor"
              name="doctor"
              label="Doctor"
              placeholder="Doctor Y"
              value
              required
              outlined
            ></v-text-field>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="primary" @click="Cancel"> Cancel </v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="Upload"> Upload </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import spinnerLoading from "@/components/SpinnerLoading.vue";

export default {
  name: "UploadFile",
  data() {
    return {
      File: null,
      isMedicine: true,
      anotherDoctor: false,
      start: null,
      end: null,
      doctor: null,
      name: null,
      dose: null,
    };
  },
  components: {
    spinnerLoading,
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    async Upload() {
      console.log("ENTROU NO UPLOAD", this.File);
      try {
        let doctor = this.anotherDoctor ? this.doctor : "Doctor Z";
        //let type = this.isMedicine ? "medicine" : "report";
        let path = `clients/${this.$route.params.client_id}/medicine/${this.File.name}`;
        let finalFile = null;
        this.isMedicine
          ? (finalFile = {
              path: path,
              file: this.File,
              clientId: this.$route.params.client_id,
              type: "medicine",
              data: {
                doctor: doctor,
                dose: this.dose,
                end: this.end,
                name: this.name,
                start: this.start,
              },
            })
          : (finalFile = {
              path: path,
              file: this.File,
              clientId: this.$route.params.client_id,
              type: "report",
              data: null,
            });
        await this.$store.dispatch("clientModule/upload", finalFile);
      } catch (e) {
        console.log(e);
      }
    },
    Cancel() {
      this.$store.dispatch("setDialog", false);
    },
  },
};
</script>