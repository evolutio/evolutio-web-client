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
              <iframe id="ytplayer" :src="iframe_src" 
                style="width: 100%" 
                :height="sizes.ifrh"
                frameborder="0" allowfullscreen="allowfullscreen"/></iframe>
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
  import VueMarkdown from 'vue-markdown'
  var DATA = {
    visible: false,
    content: null,
    open(content){
      this.visible = true;
      this.content = content;
    }
  }
  export default {
    components: { VueMarkdown },
    computed: {
      iframe_src(){
        return 'http://www.youtube.com/embed/'+this.content.ref+'?autoplay=1';
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
    data () {
      return DATA;
    },
    methods: {
    },
  }
</script>
