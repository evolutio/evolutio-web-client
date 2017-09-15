<template>
  <main>
    <v-layout row wrap>
      <v-flex xs12 sm8 offset-sm2 class="px-2 pt-5">
        <v-text-field label="assunto" v-model="subject"/>
        <v-text-field class="body" label="mensagem" multi-line v-model="body"/>
        <v-btn block primary @click="send()">Vai</v-btn>
      </v-flex>
    </v-layout>
  </main>
</template>

<script>

import AppApi from '~apijs'
import Toasts from '~/components/Toasts.js'

export default {
  data () {
    return {
      subject: '',
      body: '',
    };
  },
  methods: {
    send(){
      console.log('sending')
      AppApi.admin_send_mail(this.subject, this.body).then((result)=>{
        console.log('sent')
        Toasts.show('Emails enfileirados com sucesso', {timeout: 3000});
      });
    }
  }
}
</script>

<style scoped>
  .body{
    height: 100%,
  }
</style>