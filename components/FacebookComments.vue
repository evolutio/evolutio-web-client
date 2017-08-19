<template>
  <div class="fb-comments" :data-href="location" data-numposts="5"></div>
</template>

<script>

import Vuex from 'vuex'
import Vue from 'vue'

export default {
  // computed: Vuex.mapGetters([
  //   'location',
  // ]),
  // computed: {
  //   location(){
  //     var s = window.location.host+this.$nuxt.$route.fullPath; 
  //     console.log('location = '+s);
  //     return s;
  //   }
  // },
  data: function () {
    return {
      ready: false,
      location: '',
    }
  },
  mounted: function () {
    debugger
    this.location = window.location.host+this.$nuxt.$route.fullPath; 
    console.log('location = '+this.location);
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
