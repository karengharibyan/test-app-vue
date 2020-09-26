<template>
  <v-app>
    <Header />
    <v-main>
      <transition name="fade" mode="out-in">
          <router-view />
      </transition>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "@/components/app/Header.vue";
import Footer from "@/components/app/Footer.vue";
export default {
  name: "App",

  data: () => ({
    
  }),
  components: {
    Header,
    Footer,
  },
  mounted() {},
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>