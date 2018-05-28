// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import contactsStore from './store/contactsStore'
import routes from './routes'

Vue.use(Vuetify)
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

// Create and Setup Vue Instance
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store: contactsStore,
})
