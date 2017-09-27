<template>
  <div>
    <v-dialog lazy v-model="visible" :width="sizes.diaw">
      <v-card v-if="visible && content">
        <v-card-title>{{content.name}}</v-card-title>
        <v-card-text>
          <iframe :src="iframe_src" :width="sizes.ifrw" :height="sizes.ifrh" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
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
