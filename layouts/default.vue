<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title @click="go_home()">evolutio.io</v-toolbar-title>
      <v-toolbar-items>
        <v-toolbar-item v-if="logged_user" :router="true" :href="{name: 'perfil'}">{{logged_user.username}}</v-toolbar-item>
        <v-btn flat dark ripple v-if="!logged_user" @click.native="open_login_dialog($event)">Login</v-btn>
        <v-menu bottom left offset-y origin="top right" transition="v-slide-y-transition">
          <v-btn icon dark slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-item>
              <v-list-tile>
                <v-list-tile-title v-text="'Opcao 1'"></v-list-tile-title>
              </v-list-tile>
            </v-list-item>
            <v-list-item>
              <v-list-tile>
                <v-list-tile-title v-text="'Opcao 2'"></v-list-tile-title>
              </v-list-tile>
            </v-list-item>
            <v-list-item>
              <v-list-tile>
                <v-list-tile-title v-text="'Opcao 3'"></v-list-tile-title>
              </v-list-tile>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-dialog v-model="show_login_dialog">
      <v-card>
        <v-card-row>
          <v-card-title>Log in</v-card-title>
        </v-card-row>
        <v-card-row>
          <v-card-text>
            <v-container fluid>
              <v-text-field label="Username" required v-model="username"/>
              <v-text-field label="Password" type="password" required v-model="password" @keyup.native.enter="login()"/>
            </v-container>
          </v-card-text>
        </v-card-row>
        <v-card-row actions>
          <v-btn class="blue--text darken-1" flat @click.native="close_login_dialog()">Cancelar</v-btn>
          <v-btn class="blue--text darken-1" flat @click.native="login()" :loading="loading_login" :disabled="loading_login">Login</v-btn>
        </v-card-row>
      </v-card>
    </v-dialog>
    <nuxt></nuxt>
  </v-app>
</template>

<script>

import Vuex from 'vuex'
import AppApi from '~apijs'

//TODO: implementar autenticação

export default {
  computed: Vuex.mapGetters([
    'logged_user'
  ]),
  data(){
    return {
      show_login_dialog: false,
      loading_login: false,
      username: '',
      password: '',
    }
  },
  methods: {
    go_home(){
      this.$router.go({name: 'index'});
    },
    open_login_dialog(evt){
      this.show_login_dialog = true;
      evt.stopPropagation();
    },
    close_login_dialog(evt){
      this.show_login_dialog = false;
    },
    login(){
      this.loading_login = true;
      AppApi.login(this.username, this.password).then((result)=>{
        var user = result.data;
        if(user){
          this.$store.commit('SET_LOGGED_USER', user);
        }
        this.loading_login = false;
      });
    }
  }
}
</script>
