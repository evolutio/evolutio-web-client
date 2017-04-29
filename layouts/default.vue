<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-logo>evolutio.io</v-toolbar-logo>
      <v-toolbar-items>
        <v-toolbar-item>tonylampada</v-toolbar-item>
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