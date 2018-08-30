<template>
  <main>
    <v-layout row wrap>
      <v-flex xs12 sm8 offset-sm2 class="px-2 pt-5">
        <v-text-field label="Para" v-model="to"/>
        <v-text-field label="assunto" v-model="subject"/>
        <v-text-field class="body" label="mensagem" multi-line v-model="body"/>
        <v-btn block primary @click="send()">Vai</v-btn>
      </v-flex>
    </v-layout>
  </main>
</template>

<script>

import AppApi from '~apijs'

export default {
  data () {
    return {
      to: '',
      subject: '',
      body: '',
    };
  },
  methods: {
    send(){
      console.log('sending')
      AppApi.admin_send_mail(this.to, this.subject, this.body).then((result)=>{
        console.log('sent')
        this.$store.commit('toast/open', {message: 'Emails enfileirados com sucesso', color: 'success'})
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