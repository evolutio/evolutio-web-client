<template>
  <div>
    <v-dialog fullscreen lazy v-model="visible" :width="sizes.diaw">
      <v-card v-if="visible && content">
        <v-toolbar dark color="primary">
          <v-btn icon @click.native="visible = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{content.name}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 sm8 offset-sm2>
              <iframe :src="iframe_src" 
                style="width: 100%" :height="sizes.ifrh" 
                frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            </v-flex>
            <v-flex xs12 sm8 offset-sm2>
              <vue-markdown>{{content.md}}</vue-markdown>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import AppApi from '~apijs'

var DATA = {
  visible: false,
  content: null,
  open(content){
    this.visible = true;
    this.content = content;
  }
}

export default {
  data () {
    return DATA;
  },
  methods: {
  },
  computed: {
    iframe_src(){
      return 'https://player.vimeo.com/video/'+this.content.ref;
    },
    sizes(){
      var w = Math.min(670, parseInt(.9 * this.$vuetify.breakpoint.width))
      return {
        ifrw: w - 30,
        ifrh: parseInt(.75 * (w - 30)),
        diaw: w,
      }
    }
  },
}
</script>
