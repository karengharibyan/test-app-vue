<template>
  <v-dialog v-model="modal" max-width="600px">
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Edit Note</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form v-model="valid" class="pt-5" ref="form">
          <v-row>
            <v-col xs="12">
              <v-text-field
                :loading="loading"
                v-model="form.title"
                label="Title"
                name="title"
                type="text"
                :rules="rules.titleRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col xs="12">
              <v-textarea
                :loading="loading"
                v-model="form.text"
                label="Text"
                name="text"
                type="text"
                :rules="rules.textRules"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col xs="12" sm="4" lg="4">
              <v-avatar
                v-if="!cropping && form.image"
                size="164"
                :loading="loading"
              >
                <img :src="image_url" alt="John" />
              </v-avatar>
            </v-col>
          </v-row>
          <v-row v-if="cropping">
            <div>
              <vue-cropper
                ref="cropper"
                :src="image_url"
                alt="Source Image"
                :containerStyle="{
                  height: 300,
                }"
              >
              </vue-cropper>
              <div class="croper-actions" v-if="!!cropping">
                <v-btn @click="rotate(-90)"
                  ><v-icon>mdi-rotate-left</v-icon></v-btn
                >
                <v-btn @click="() => crop()"><v-icon>mdi-crop</v-icon></v-btn>
                <v-btn @click="rotate(90)"
                  ><v-icon>mdi-rotate-right</v-icon></v-btn
                >
              </div>
            </div>
          </v-row>
          <v-row>
            <v-col xs="12">
              <v-file-input
                v-model="form.image"
                :rules="rules.imageRules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an image"
                prepend-icon="mdi-camera"
                label="Image"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" :disabled="(!valid || loading || cropping)" @click="save"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  name: "AddNoteModal",
  props: ["afterSave","open"],
  data: () => ({
    modal: false,
    valid: false,
    loading: false,
    form: {
      title: "",
      text: "",
      image: null,
    },
    cropping: false,
    rules: {
      titleRules: [(title) => !!title || "Title is required"],
      textRules: [
        (text) => !!text || "text is required",
        (text) => text.length > 6 || "text must be at last 6",
      ],
      imageRules: [
        (file) =>
          !file ||
          file.size < 2000000 ||
          "Image size should be less than 2 MB!",
      ],
    },
    error: null,
  }),
  watch: {
    "form.image": function (value) {
      if (value) {
        this.cropping = true;
      } else {
        this.cropping = false;
      }
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.form.password === this.form.repeat_password ||
        "Passwords must match";
    },
    image_url() {
      return this.form.image ? URL.createObjectURL(this.form.image) : "";
    },
  },
  methods: {
    save() {
      this.loading = true;
      const formData = new FormData();
      Object.keys(this.form).map((key) => {
        formData.append(key, this.form[key]);
      });
      this.$http
        .post("/notes", formData)
        .then(() => {
          this.afterSave();
          this.dialog = false;
          this.form = {
            title: "",
            text: "",
            image: null,
          };
         this.$refs.form.resetValidation()
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    crop() {
        this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        this.image = blob;
        this.cropping = false;
      });
    },
    rotate(rotationAngle) {
      this.$refs.cropper.rotate(rotationAngle);
      // this.$refs.cropper.rotate(rotationAngle);
    },
  },
};
</script>


<style lang="scss" scoped>
</style>