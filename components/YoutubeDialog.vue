<template>
  <div>
    <v-dialog lazy v-model="visible" :width="sizes.diaw">
      <v-card v-if="visible && content">
        <v-card-row>
          <v-card-title>{{content.name}}</v-card-title>
        </v-card-row>
        <v-card-text>
          <iframe id="ytplayer" :src="iframe_src" :width="sizes.ifrw" :height="sizes.ifrh" frameborder="0" allowfullscreen="allowfullscreen"/></iframe>
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
    // debugger;
    this.visible = true;
    this.content = content;
  }
}

export default {
  data () {
    return DATA;
  },
  mounted () {
     console.log(this.$vuetify.breakpoint);
     window.BRK = this.$vuetify.breakpoint;
  },
  methods: {
  },
  computed: {
    iframe_src(){
      return 'http://www.youtube.com/embed/'+this.content.ref+'?autoplay=1';
    },
    sizes(){
      return {
        ifrw: this.$vuetify.breakpoint.mdAndUp ? 640 : this.$vuetify.breakpoint.smAndUp ? 320 : 160,
        ifrh: this.$vuetify.breakpoint.mdAndUp ? 480 : this.$vuetify.breakpoint.smAndUp ? 240 : 120,
        diaw: this.$vuetify.breakpoint.mdAndUp ? 670 : this.$vuetify.breakpoint.smAndUp ? 350 : 190,
      }
    }
  },

}
</script>
