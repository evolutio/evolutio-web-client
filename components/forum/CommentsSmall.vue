<template>
  <v-layout row wrap class="my-2">
    <CommentTextBox @send="text => comment(text)" />
    <div v-if="!loading" v-for="comment in forum.comments.slice(0, 3)" :key="comment.id">
      <comment-snippet :comment="comment" @open="open" />
      <div v-for="reply in comment.replies.slice(0, 2)" :key="reply.id" class="ml-3">
        <comment-snippet :comment="reply"  @open="open" />
      </div>
      <v-layout class="mb-3" style="margin-top: -10px" row wrap justify-start>
        <a class="text-gray mr-3" @click="open(comment, showAllReplies = true)" v-if="comment.replies.length > 2">
          Ver todas {{comment.replies.length | plural('resposta', 'respostas')}}
        </a>
        <a class="text-gray" @click="open(comment, showAllReplies = false, reply = true)" v-if="logged_user">
          Responder
        </a>
      </v-layout>
    </div>
    <v-layout row wrap>
      <v-btn block depressed class="mb-2 text-gray" @click="open()" v-if="forum.comments.length > 3">
        Ver todos {{forum.comments.length | plural('comentário', 'comentários')}}
      </v-btn>
    </v-layout>
  </v-layout>
</template>

<script>

import Vue from 'vue'
import Vuex from 'vuex'
import AppApi from '~apijs'
import CommentSnippet from '~/components/forum/CommentSnippet'
import moment from 'moment'
import VueMarkdown from 'vue-markdown'
import CommentTextBox from '~/components/forum/CommentTextBox'


export default {
  components: {
    VueMarkdown,
    CommentSnippet,
    CommentTextBox
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
    open (comment, showAllReplies = false, reply = false) {
      this.$emit('open', {
        comment,
        showAllReplies,
        reply
      })
    },
    comment (text) {

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