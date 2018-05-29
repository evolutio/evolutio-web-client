<template>
  <v-layout row wrap class="my-2">
    <v-flex xs12 class="ml-3">
    <v-switch label="Acompanhar por email" v-model="forum.notify_email" @change="toggle_follow()"/>
    </v-flex>
    <template v-if="logged_user">
      <v-flex xs2 sm1 class="mt">
        <v-avatar size="48px">
          <img v-if="logged_user.img" :src="logged_user.img">
          <v-icon v-else x-large>account_circle</v-icon>
        </v-avatar>
      </v-flex>
      <v-flex xs10 sm11>
        <v-btn primary block @click="gocomment($event)">Adicione um comentário</v-btn>
      </v-flex>
    </template>
    <template v-if="!loading" v-for="comment in forum.comments">
      <v-flex xs2 sm1 class="mt-3">
        <v-avatar size="48px">
          <img :src="comment.author_img" alt="">
        </v-avatar>
      </v-flex>
      <v-flex xs10 sm11 class="grey lighten-2 mt-3 px-3 pt-3 pb-1 rounded">
        <p>
          <strong>{{comment.author}}</strong>,
          <span v-tooltip:top="{ html: asdatetime(comment.created_at) }">{{comment.created_at | fromnow}}</span>
        </p>
        <vue-markdown class="comment-text" :source="comment.text"/>
        <p class="mb-1">
          <a class="link" @click="goreply(comment, $event)">Responder</a>
          <a class="link" v-if="logged_user && comment.author_id == logged_user.id" @click="goedit(comment, $event)"> Editar</a>
        </p>
      </v-flex>
      <template v-for="(reply, rindex) in comment.replies">
        <v-flex xs1></v-flex>
        <v-flex xs2 sm1 class="mt-3">
          <v-avatar size="36px">
            <img :src="reply.author_img" alt="">
          </v-avatar>
        </v-flex>
        <v-flex xs9 sm10 class="grey lighten-2 mt-3 px-3 pt-3 pb-1 rounded">
          <p>
            <strong>{{reply.author}}</strong>, 
            <span v-tooltip:top="{ html: asdatetime(comment.created_at) }">{{reply.created_at | fromnow}}</span>
          </p>
          <vue-markdown class="comment-text" :source="reply.text"/>
          <p>
            <a v-if="rindex == comment.replies.length-1" class="link" @click="goreply(comment, $event)">Responder</a>
            <a class="link" v-if="logged_user && reply.author_id == logged_user.id" @click="goedit(reply, $event)"> Editar</a>
          </p>
        </v-flex>
      </template>
      <div :ref="'end_'+comment.id"></div>
    </template>
    <template v-if="logged_user && forum.comments.length > 0">
      <v-flex xs2 sm1 class="mt">
        <v-avatar size="48px">
          <img v-if="logged_user.img" :src="logged_user.img">
          <v-icon v-else x-large>account_circle</v-icon>
        </v-avatar>
      </v-flex>
      <v-flex xs10 sm11>
        <v-btn primary block @click="gocomment($event)">Adicione um comentário</v-btn>
      </v-flex>
    </template>
    <div ref="end"></div>
    <textarea-dialog ref="commentdialog"></textarea-dialog>
  </v-layout>
</template>

<script>

import Vue from 'vue'
import Vuex from 'vuex'
import AppApi from '~apijs'
import Toasts from '~/components/Toasts.js'
import TextareaDialog from '~/components/TextareaDialog.vue'
import moment from 'moment'
import VueMarkdown from 'vue-markdown'

export default {
  components: {VueMarkdown, TextareaDialog},
  props: ['forum'],
  data: function () {
    return {
      loading: false,
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'logged_user',
    ]),
  },
  methods: {
    gocomment (evt) {
      if (this.logged_user) {
        this.$refs.commentdialog.open({
          title: 'Adicione um comentário',
          label: 'Comentário',
          value: '',
          action: 'Enviar',
          actionFunc: value => {
            return AppApi.send_comment(this.forum.id, null, value).then(response => {
              const newcomment = {...response.data, replies: []};
              this.forum.comments.push(newcomment);
              setTimeout(()=>{
                this.$refs.end.scrollIntoView()
              }, 1)
            })
          }
        })
        if (evt) {
          evt.stopPropagation()
        }
      } else {
        Toasts.show('Faça login para comentar', {timeout: 3000});
      }
    },
    goreply (comment, evt) {
      if (this.logged_user) {
        this.$refs.commentdialog.open({
          title: 'Responder',
          label: 'Resposta',
          value: '',
          action: 'Enviar',
          actionFunc: value => {
            return AppApi.send_comment(this.forum.id, comment.id, value).then(response => {
              comment.replies.push(response.data)
              setTimeout(()=>{
                this.$refs['end_'+comment.id][0].scrollIntoView()
              }, 1)
            })
          }
        })
        if (evt) {
          evt.stopPropagation()
        }
      } else {
        Toasts.show('Faça login para responder', {timeout: 3000});
      }
    },
    goedit (comment, evt) {
      this.$refs.commentdialog.open({
        title: 'Editar resposta',
        label: 'Resposta',
        value: comment.text,
        action: 'Enviar',
        actionFunc: value => {
          return AppApi.edit_comment(comment.id, value).then(response => {
            comment.text = response.data.text
          })
        }
      })
      if (evt) {
        evt.stopPropagation()
      }
    },
    toggle_follow () {
      if (this.logged_user) {
        AppApi.follow_course_by_email(this.forum.id, this.forum.notify_email).then(() => {
          if(this.forum.notify_email){
            Toasts.show('Você vai receber emails sempre que alguém adicionar um comentário', {timeout: 3000});
          } else {
            Toasts.show('Você não vai mais receber emails com comentários nesta conversa', {timeout: 3000});
          }
        })
      } else {
        Toasts.show('Você precisa fazer login primeiro!', {timeout: 3000});
        this.forum.notify_email = false
      }
    },
    asdatetime (d) {
      if (!d) return
      return moment(d).format('DD/MM/YYYY HH:mm')
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

<style lang="scss">
  .comment-text {
    word-wrap: break-word;
    img {
      max-width: 100%;
    }
    h1 {
      font-size: 36px;
    }
    h2 {
      font-size: 30px;
    }
    h3 {
      font-size: 24px;
    }
    h4 {
      font-size: 18px;
    }
    h5 {
      font-size: 14px;
    }
    h6 {
      font-size: 12px;
    }
  }

</style>