<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
        <router-link to="/">
             <h1 class="app_title">Test App</h1>
        </router-link>
    </div>
    <div>
      <ul class="navMenu" v-if="this.$auth.check()">
        <li>
          <router-link to="/notes">
             Notes
          </router-link>
        </li>
      </ul>
    </div>
    <v-spacer></v-spacer>
    <div v-if="!this.$auth.check()">
       <SignUpModal />
      <SignInModal />
    </div>
    <div v-else>
      <v-btn  class="ma-2" color="primary" dark @click="signOut">Logout
        <v-icon dark right>mdi-logout</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>


<script>
import SignInModal from "@/components/auth/SignInModal.vue";
import SignUpModal from "@/components/auth/SignUpModal.vue";
export default {
  name: "Header",
  components: {
    SignInModal,
    SignUpModal
  },
  methods: {
    signOut(){
      this.$auth.logout()
    }
  }
};
</script>

<style lang="scss" scoped>
.app_title{
  color: #fff
}
.navMenu{
  list-style: none;
  display: flex;
  a{
    color: #fff;
    text-decoration: none;
  }
}
</style>