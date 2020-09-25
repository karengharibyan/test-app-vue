<template>
  <v-app>
    <Header />
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
      <transition
        name="fade"
        mode="out-in"
      >
      <router-view />
      </transition>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/app/Header.vue'
import Footer from '@/components/app/Footer.vue'
export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    Header,
    Footer
  },
  mounted(){
    console.log(this.$auth.login({
      data: {email: 'birdie.koepp@example.com',password: "password"}
    }))
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>