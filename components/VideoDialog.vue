<script>
  import AppApi from '~apijs'
  import VueMarkdown from 'vue-markdown'
  export default {
    components: { VueMarkdown },
    computed: {
      iframe_src(){
        if(this.content.kind == 'youtube'){
          return 'http://www.youtube.com/embed/'+this.content.ref+'?autoplay=1';
        } else if(this.content.kind == 'vimeo'){
          return 'https://player.vimeo.com/video/'+this.content.ref;
        }
      },
      sizes(){
        var w = Math.min(670, parseInt(.9 * this.$vuetify.breakpoint.width))
        return {
          ifrw: w - 30,
          ifrh: parseInt(.75 * (w - 30)),
          diaw: w,
        }
      },
      visible() {
        return !!this.content;
      }
    },
    data () {
      return {
        content: null,
      };
    },
    methods: {
      open(content){
        this.content = content;
      },
      close(){
        this.content = null;
        this.$emit('close');
      }
    },
  }
</script>

<template>
  <div>
    <v-dialog fullscreen lazy v-model="visible" :width="sizes.diaw">
      <v-card v-if="visible">
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
                style="width: 100%" :height="sizes.ifrh"
                frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen/></iframe>
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
