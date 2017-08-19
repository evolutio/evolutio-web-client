<template>
  <div>
    <v-dialog v-model="visible" width="670px">
      <v-card v-if="visible && content">
        <v-card-row>
          <v-card-title>{{content.name}}</v-card-title>
        </v-card-row>
        <v-card-text>
          <iframe id="ytplayer" :src="iframe_src" width="640" height="480" frameborder="0" allowfullscreen="allowfullscreen"/></iframe>
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
  methods: {
  },
  computed: {
    iframe_src(){
      return 'http://www.youtube.com/embed/'+this.content.ref+'?autoplay=1';
    }
  },

}
</script>
