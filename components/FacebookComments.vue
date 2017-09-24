<template>
  <div class="fb-comments" :data-href="location" data-numposts="5"></div>
</template>

<script>

import Vue from 'vue'

export default {
  data: function () {
    return {
      ready: false,
      baseurl: '',
    }
  },
  props: ['path'],
  computed: {
    location(){
      return this.baseurl + this.path;
    }
  },
  mounted: function () {
    this.baseurl = window.location.protocol+"//"+window.location.host; 
    this.initializefb();
    window.addEventListener('fb-sdk-ready', this.onFBReady);
  },
  beforeDestroy: function () {
    window.removeEventListener('fb-sdk-ready', this.onFBReady);
  },
  methods: {
    onFBReady() {
      this.initializefb();
    },
    initializefb(){
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
