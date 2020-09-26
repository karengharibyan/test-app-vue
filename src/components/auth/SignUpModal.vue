<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mx-6" color="primary" dark v-bind="attrs" v-on="on">
        Sign Up
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Login form</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-alert
          class="ma-5"
          :value="!!error"
          dense
          outlined
          type="error"
          transition="scale-transition"
        >
          {{ error }}
        </v-alert>
        <v-form v-model="valid" class="pt-5" ref="form">
          <v-row>
            <v-col xs="12" sm="6" lg="6">
              <v-text-field
                v-model="form.first_name"
                label="First Name"
                name="first_name"
                prepend-icon="mdi-account"
                type="text"
                :rules="rules.firstNameRules"
              ></v-text-field>
            </v-col>
            <v-col xs="12" sm="6" lg="6">
              <v-text-field
                v-model="form.last_name"
                label="Last Name"
                name="last_name"
                prepend-icon="mdi-account"
                type="text"
                :rules="rules.lastNameRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col xs="12">
              <v-text-field
                v-model="form.email"
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                type="text"
                :rules="rules.emailRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col xs="12" sm="6" lg="6">
              <v-text-field
                v-model="form.password"
                :rules="rules.passwordRules"
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>
            </v-col>
            <v-col xs="12" sm="6" lg="6">
              <v-text-field
                v-model="form.repeat_password"
                :rules="[passwordConfirmationRule]"
                id="repeat_password"
                label="Confirm Password"
                name="confirm_password"
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="!!form.avatar" justify="center" align="center">
            <v-col xs="12" sm="4" lg="4">
              <v-avatar size="164">
                <img
                  :src="image_url"
                  alt="John"
                />
              </v-avatar>
            </v-col>
          </v-row>
          <v-row>
            <v-col xs="12">
              <v-file-input
                v-model="form.avatar"
                :rules="rules.avatarRules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Avatar"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" :disabled="!valid" @click="signUp">Sign Up</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  name: "SignUpModal",
  data: () => ({
    dialog: false,
    valid: false,
    form: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      repeat_password: "",
      rememberMe: false,
      avatar: null,
    },
    rules: {
      firstNameRules: [
        (first_name) => !!first_name || "First Name is required",
      ],
      lastNameRules: [(last_name) => !!last_name || "Last Name is required"],
      emailRules: [
        (email) => !!email || "E-mail is required",
        (email) => /.+@.+/.test(email) || "E-mail must be valid",
      ],
      passwordRules: [
        (password) => !!password || "Password is required",
        (password) => password.length > 6 || "Password must be at last 6",
      ],
      avatarRules: [
        (file) =>
          !file ||
          file.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
    },
    error: null,
  }),
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.form.password === this.form.repeat_password ||
        "Passwords must match";
    },
    image_url(){
      return this.form.avatar ? URL.createObjectURL(this.form.avatar) : ''
    }
  },
  methods: {
    signUp() {
      const formData = new FormData()
      Object.keys(this.form).map(key => {
        formData.append(key,this.form[key])
      })
      this.$auth
        .register({
          data: formData
        })
        .then((response) => {
          console.log(response);
          this.dialog = false;
        })
        .catch((error) => {
          console.log(error.response);
          this.error = error?.response?.data;
          setTimeout(() => {
            this.error = null;
          }, 4000);
        });
    },
  },
};
</script>


<style lang="scss" scoped>
</style>