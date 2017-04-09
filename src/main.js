// require('~font-awesome');
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from 'src/components/home/Home.vue'
import Course from 'src/components/course/Course.vue'
import Profile from 'src/components/profile/Profile.vue'

Vue.use(VueRouter);
const routes = [
  { path: '/', component: Home, name: 'home'},
  { path: '/curso/:code', component: Course, name: 'course'},
  { path: '/perfil', component: Profile, name: 'profile'},
  { path: '*', redirect: '/' }
];
const router = new VueRouter({routes})


new Vue({
  el: '#app',
  router: router,
  components: {},
  render: h => h(App)
})
