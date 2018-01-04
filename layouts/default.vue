<template>
  <v-app>
    <el-container>
      <Header></Header>
    </el-container> 
    
   
    <v-snackbar bottom right 
      v-model="toasts_model.visible" 
      :timeout="toasts_model.timeout">{{toasts_model.text}}</v-snackbar>
    <nuxt></nuxt>
  </v-app>
</template>

<script>

import Header from '~/components/Header.vue'
import Events from '~/components/Events.js'

export default {
  components: {Header},
  data(){
    return {
      toasts_model: {
        visible: false,
        text: '',
        timeout: 1000,
      }
    }
  },
  mounted(){
    Events.subscribe('toast', (data)=>{
      this.show_toast(data);
    })
  },
  methods: {
    show_toast(data){
      this.toasts_model.text = data.text;
      this.toasts_model.timeout = data.timeout;
      this.toasts_model.visible = true;
      console.log('show toast event');
    }
  }
}
</script>