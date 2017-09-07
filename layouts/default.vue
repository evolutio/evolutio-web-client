<template>
  <v-app class="app">
    <v-toolbar>
      <v-toolbar-title ><router-link class="toolbar-title" to="/">evolutio</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>

        <v-btn flat dark ripple v-if="!logged_user" @click="open_login_dialog($event)">Login</v-btn>
        <v-menu v-if="logged_user" bottom left offset-y origin="top right" transition="v-slide-y-transition">
          <v-btn flat dark ripple slot="activator">
            {{logged_user.username}}
          </v-btn>
          <v-list>
            <v-list-item >
              <v-list-tile :router="true" :href="{name: 'perfil'}">
                <v-list-tile-title v-text="'Perfil'"></v-list-tile-title>
              </v-list-tile>
            </v-list-item>
            <v-list-item>
              <v-list-tile @click="logoff()">
                <v-list-tile-title v-text="'Log off'"></v-list-tile-title>
              </v-list-tile>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <LoginDialogSocial ref="login_dialog"></LoginDialogSocial>
    <nuxt></nuxt>
  </v-app>
</template>

<script>

import Vuex from 'vuex'
import AppApi from '~apijs'
import LoginDialogSocial from '~/components/LoginDialogSocial.vue'

export default {
  computed: Vuex.mapGetters([
    'logged_user'
  ]),
  components: {LoginDialogSocial},
  data(){
    return {
    }
  },
  methods: {
    go_home(){
      this.$router.go('/');
      console.log('yo')
    },
    open_login_dialog(evt){
      this.$refs.login_dialog.open();
      evt.stopPropagation();
    },
    logoff(){
      AppApi.logout().then(()=>{
        this.$store.commit('SET_LOGGED_USER', null);
      });
    }
  }
}
</script>

<style scoped lanc="scss">
  .toolbar-title {
    font-family: arial;
    font-size: 28px;
    font-weight: bold;
    color: #006fcf;
    text-decoration: initial;
  }
  .app {
    /*max-width: 900px;*/
  }
</style>