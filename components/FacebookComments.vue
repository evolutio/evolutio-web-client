<template>
  <div class="fb-comments" :data-href="location" data-numposts="5"></div>
</template>

<script>

import Vuex from 'vuex'
import Vue from 'vue'

export default {
  computed: Vuex.mapGetters([
    'location',
  ]),
  data: function () {
    return {ready: false}
  },
  mounted: function () {
    debugger
    this.initializefb();
    window.addEventListener('fb-sdk-ready', this.onFBReady);
  },
  beforeDestroy: function () {
    window.removeEventListener('fb-sdk-ready', this.onFBReady);
  },
  methods: {
    onFBReady() {
    debugger
      this.initializefb();
    },
    initializefb(){
      debugger;
      if(Vue.FB && !this.ready){
        console.log('initializefb')
        window.FB = Vue.FB;
        Vue.FB.init(Vue.FB.OPTIONS);
        this.ready = true;
      }
    }
  }
}
</script>
