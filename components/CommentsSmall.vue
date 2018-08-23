<template>
  <v-layout row wrap class="my-2">
    <v-layout row v-if="logged_user">
      <v-avatar size="32px" class="mr-2">
        <img v-if="logged_user.img" :src="logged_user.img">
        <v-icon v-else x-large>account_circle</v-icon>
      </v-avatar>
      <v-flex>
        <v-text-field
          @click="gocomment($event)"
          placeholder="Adicione um comentário"
          class="ma-0 py-0"
        />
      </v-flex>
    </v-layout>
    <div v-if="!loading" v-for="comment in forum.comments" :key="comment.id">
      <comment-snippet :comment="comment" />
      <div v-for="reply in comment.replies" :key="reply.id" class="ml-3">
        <comment-snippet :comment="reply" :reply-to="comment" />
      </div>
    </div>
    <textarea-dialog ref="commentdialog"></textarea-dialog>
  </v-layout>
</template>

<script>

import Vue from 'vue'
import Vuex from 'vuex'
import AppApi from '~apijs'
import Toasts from '~/components/Toasts.js'
import TextareaDialog from '~/components/TextareaDialog'
import CommentSnippet from '~/components/forum/CommentSnippet'
import moment from 'moment'
import VueMarkdown from 'vue-markdown'

export default {
  components: {VueMarkdown, TextareaDialog, CommentSnippet},
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