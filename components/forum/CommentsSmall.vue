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
    <div v-if="!loading" v-for="comment in forum.comments.slice(0, 3)" :key="comment.id">
      <comment-snippet :comment="comment" @reply="goreply" @edit="goedit" @viewComment="viewComment" />
      <div v-for="reply in comment.replies.slice(0, 2)" :key="reply.id" class="ml-3">
        <comment-snippet :comment="reply" :reply-to="comment" @reply="goreply" @edit="goedit"/>
      </div>
      <div class="ml-3 mb-2 clickable text-gray" style="margin-top: -10px" v-if="comment.replies.length > 2">
        Ver todas {{comment.replies.length | plural('resposta', 'respostas')}}
      </div>
    </div>
    <div class="mb-2 clickable text-gray" style="margin-top: -10px" v-if="forum.comments.length > 3">
      Ver todos {{forum.comments.length | plural('comentário', 'comentários')}}
    </div>
    <textarea-dialog ref="commentdialog" />
  </v-layout>
</template>

<script>

import Vue from 'vue'
import Vuex from 'vuex'
import AppApi from '~apijs'
import TextareaDialog from '~/components/TextareaDialog'
import CommentSnippet from '~/components/forum/CommentSnippet'
import moment from 'moment'
import VueMarkdown from 'vue-markdown'
import forumhelper from '~/helpers/forumhelper.js'


export default {
  components: {
    VueMarkdown,
    TextareaDialog,
    CommentSnippet
  },
  props: ['forum'],
  data: function () {
    return {
      loading: false,
    }
  },
  computed: {
    ...Vuex.mapGetters({
      logged_user: 'auth/logged_user',
    }),
  },
  methods: {
    gocomment (evt) {
      forumhelper.gocomment(this, evt)
    },
    goreply (comment, evt) {
      forumhelper.goreply(this, comment, evt)
    },
    goedit (comment, evt) {
      forumhelper.goedit(this, comment, evt)
    },
    toggle_follow () {
      forumhelper.toggle_follow(this)
    },
    viewComment (comment) {
      this.$refs.comment_dialog.show(this.forum)
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