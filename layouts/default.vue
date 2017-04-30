<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title @click="go_home()">evolutio.io</v-toolbar-title>
      <v-toolbar-items>
        <v-toolbar-item :router="true" :href="{name: 'perfil'}">tonylampada</v-toolbar-item>
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

//TODO: implementar autenticação

export default {
  methods: {
    go_home(){
      this.$router.go({name: 'index'});
    }
  }
}
</script>
