<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title @click="go_home()">evolutio.io</v-toolbar-title>
      <v-toolbar-items>
        <v-toolbar-item v-if="logged_user" :router="true" :href="{name: 'perfil'}">{{logged_user.username}}</v-toolbar-item>
        <v-toolbar-item v-if="!logged_user">Login</v-toolbar-item>
        <button @click="g()">vai</button>
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
    <nuxt></nuxt>
  </v-app>
</template>

<script>

import Vuex from 'vuex'

//TODO: implementar autenticação

export default {
  computed: Vuex.mapGetters([
    'logged_user'
  ]),
  methods: {
    go_home(){
      this.$router.go({name: 'index'});
    },
    g(){
      console.log(this.logged_user);
    }
  }
}
</script>
