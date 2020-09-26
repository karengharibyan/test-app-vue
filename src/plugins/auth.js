import Vue from "vue";
import auth from "@websanova/vue-auth";
import authBasic from "@websanova/vue-auth/dist/drivers/auth/bearer.js";
import routerVueRouter from "@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm.js";
import httpVueResource from "@websanova/vue-auth/dist/drivers/http/axios.1.x.js";
import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
Vue.use(VueAxios, axios);

Vue.use(auth, {
  auth: authBasic,
  http: httpVueResource,
  router: routerVueRouter,
  loginData: {
    url: 'auth/signin',
    method: "POST",
    redirect: "/",
    fetchUser: true,
    staySignedIn: true,
  },
  registerData: {
    url: 'auth/signup',
    method: 'POST',
    redirect: '/',
    autoLogin: true
  },
  logoutData: {
    url: 'auth/signout',
    method: 'POST',
    redirect: '/',
    makeRequest: true
  },
  fetchData:{
        url: 'user',
        method: 'GET',
        enabled: true
  }
});
