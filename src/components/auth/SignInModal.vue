<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on"> Sign In </v-btn>
    </template>
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Login form</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-alert class="ma-5" :value="!!error" dense outlined type="error" transition="scale-transition">
          {{ error }}
        </v-alert>
        <v-form v-model="valid" class="pt-5">
          <v-text-field
            v-model="email"
            label="Email"
            name="email"
            prepend-icon="mdi-account"
            type="text"
            :rules="emailRules"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            id="password"
            label="Password"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
          ></v-text-field>
          <v-checkbox
            v-model="rememberMe"
            label="remember me"
            required
          ></v-checkbox>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" :disabled="!valid" @click="signIn">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  name: "SignInModal",
  data: () => ({
    dialog: false,
    valid: false,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    passwordRules: [(v) => !!v || "Password is required"],
    rememberMe: false,
    error: null,
  }),
  methods: {
    signIn() {
      this.$auth
        .login({
          data: {
            email: this.email,
            password: this.password,
          },
          staySignedIn: this.rememberMe,
        })
        .then((response) => {
          console.log(response);
          this.dialog = false;
        })
        .catch((error) => {
          console.log(error.response);
          this.error = error?.response?.data;
          setTimeout(() => {
             this.error = null
          }, 4000);
        });
    },
  },
};
</script>


<style lang="scss" scoped>
</style>