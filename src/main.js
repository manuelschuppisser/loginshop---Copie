import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from "firebase/app";
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.config.productionTip = false
var firebaseConfig = {
  apiKey: "AIzaSyA7SvhaLE9Fk-7x2oYhJ7OLdHF3EdfBe_c",
  authDomain: "manu-86356.firebaseapp.com",
  databaseURL: "https://manu-86356.firebaseio.com",
  projectId: "manu-86356",
  storageBucket: "manu-86356.appspot.com",
  messagingSenderId: "662207957068",
  appId: "1:662207957068:web:dd0a3f6608456abc744ce9",
  measurementId: "G-2N6PRS6QMV"

};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(user => {
  console.log("user", user);
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});

