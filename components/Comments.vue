<template>
  <v-layout row wrap class="my-2">
    <template v-if="logged_user">
      <v-flex xs2 sm1 class="mt-3">
        <v-avatar size="48px">
          <img v-if="logged_user.img" :src="logged_user.img">
          <v-icon v-else x-large>account_circle</v-icon>
        </v-avatar>
      </v-flex>
      <v-flex xs10 sm11>
        <v-text-field v-model="text" auto-grow rows="2" multi-line label="Adicione um comentário" 
          @focus="editing=true" @blur="losefocus" @keyup.ctrl.enter="send"
           hint="Ctrl+Enter para enviar" persistent-hint></v-text-field>
        <p v-if="editing || sending" class="text-xs-right"><v-btn @click="send" :loading="sending" primary>Enviar</v-btn></p>
      </v-flex>
    </template>
    <template v-if="!loading" v-for="comment in comments">
      <v-flex xs2 sm1 class="mt-3">
        <v-avatar size="48px">
          <img :src="comment.author_img" alt="">
        </v-avatar>
      </v-flex>
      <v-flex xs10 sm11 class="grey lighten-2 mt-3 px-3 pt-3 pb-1 rounded">
        <p ><strong>{{comment.author}}</strong>, <span v-tooltip:top="{ html: comment.created_at }">{{comment.created_at}}</span></p>
        <p class="mb-1">{{comment.text}}</p>
        <p class="mb-1"><a class="link" @click="openreply(comment)">Responder</a></p>
      </v-flex>
      <template v-for="(reply, rindex) in comment.replies">
        <v-flex xs1></v-flex>
        <v-flex xs2 sm1 class="mt-3">
          <v-avatar size="36px">
            <img :src="reply.author_img" alt="">
          </v-avatar>
        </v-flex>
        <v-flex xs9 sm10 class="grey lighten-2 mt-3 px-3 pt-3 pb-1 rounded">
          <p><strong>{{reply.author}}</strong>, <span>{{reply.created_at}}</span></p>
          <p class="mb-1">{{reply.text}}</p>
          <p v-if="rindex == comment.replies.length-1"><a class="link" @click="openreply(comment)">Responder</a></p>
        </v-flex>
      </template>
      <template v-if="comment.showreply">
        <v-flex xs1></v-flex>
        <v-flex xs1 sm1 class="mt-3">
          <v-avatar size="48px">
            <img v-if="logged_user.img" :src="logged_user.img">
            <v-icon v-else x-large>account_circle</v-icon>
          </v-avatar>
        </v-flex>
        <v-flex xs9 sm10>
          <v-text-field v-model="text" auto-grow rows="2" multi-line label="Adicione uma resposta" 
            @focus="editing=true" @blur="losefocus" @keyup.ctrl.enter="send_reply(comment)"
             hint="Ctrl+Enter para enviar" persistent-hint></v-text-field>
          <p class="text-xs-right"><v-btn @click="send_reply(comment)" :loading="comment.sending_reply" primary>Enviar</v-btn></p>
        </v-flex>
      </template>
    </template>
    <div ref="end"></div>
  </v-layout>
</template>

<script>

import Vue from 'vue'
import Vuex from 'vuex'
import AppApi from '~apijs'
import Toasts from '~/components/Toasts.js'

export default {
  props: ['comments'],
  data: function () {
    return {
      text: '',
      loading: false,
      editing: false,
      sending: false,

    }
  },
  computed: {
    ...Vuex.mapGetters([
      'logged_user',
    ]),
  },
  methods: {
    send(){
      this.sending = true;
      AppApi.send_comment(this.text).then(response => {
        this.comments.push(response.data)
        this.sending = false;
        this.text = '';
        setTimeout(()=>{
          this.$refs.end.scrollIntoView()
        }, 1)
        
      })
    },
    send_reply(comment){

    },
    losefocus(){
      window.setTimeout(()=>{
        this.editing = false;
      }, 500)
    },
    openreply(comment) {
      if (this.logged_user) {
        Vue.set(comment, 'showreply', true);
      } else {
        Toasts.show('Faça login para responder', {timeout: 3000});
      }
    }
  }
}
</script>

<style scoped>
  .rounded {
    border-radius: 10px;
  }
  .link:hover {
    text-decoration: underline;
    cursor: pointer;
  }
</style>