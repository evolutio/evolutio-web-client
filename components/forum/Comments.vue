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

    <div v-if="!loading" v-for="comment in forum.comments" :key="comment.id" class="comment-box py-3 full-width">
      <v-layout row align-center class="my-2">
        <AuthorSnippet :comment="comment"/>
        <div>
          <v-btn color="secondary" @click="goreply(comment, $event)" flat small>
            <v-icon class="mr-2 fs-sm">reply</v-icon>
            Responder
          </v-btn>
          <v-btn color="secondary" v-if="logged_user && comment.author_id == logged_user.id" @click="goedit(comment, $event)" flat small>
            <v-icon class="mr-2 fs-sm">edit</v-icon>
            Editar
          </v-btn>
        </div>
      </v-layout>
      <v-layout column>
        <v-flex>
          <vue-markdown class="comment-text" :source="comment.text"/>
        </v-flex>
        <v-layout column>
          <div v-for="reply in comment.replies" :key="reply.id" class="ml-5 py-2 reply-box">
            <v-layout row wrap align-center class="my-2">
              <AuthorSnippetSimple :comment="reply" class="py-1" />
              <v-btn small flat color="grey" class="fs-xs" v-if="logged_user && reply.author_id == logged_user.id" @click="goedit(reply, $event)"> <v-icon class="fs-ls mr-2">edit</v-icon>Editar</v-btn>
            </v-layout>
            <v-layout column>
              <div v-if="reply.expanded || reply.text.length < 250">
                <vue-markdown class="comment-text fs-ls" :source="reply.text"/>
                <a v-if="reply.expanded" class="fs-ls" @click="hideComment(reply)">Ler menos</a>
              </div>
              <span v-else @click="expandComment(reply)" class="clickable">
                {{comment.text | trim(size || 250)}}
                <a class="fs-ls" @click="expandComment(reply)">Ler tudo</a>
              </span>
            </v-layout>
          </div>
        </v-layout>
      </v-layout>
    </div>
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
import TextareaDialog from '~/components/TextareaDialog'
import AuthorSnippet from '~/components/forum/AuthorSnippet'
import AuthorSnippetSimple from '~/components/forum/AuthorSnippetSimple'
import moment from 'moment'
import VueMarkdown from 'vue-markdown'
import forumhelper from '~/helpers/forumhelper.js'


export default {
  props: ['forum'],
  components: {
    VueMarkdown,
    TextareaDialog,
    AuthorSnippet,
    AuthorSnippetSimple
  },
  data: function () {
    return {
      loading: false
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'logged_user',
    ]),
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
    asdatetime (d) {
      if (!d) return
      return moment(d).format('DD/MM/YYYY HH:mm')
    },
    expandComment (comment) {
      Vue.set(comment, 'expanded', true)
    },
    hideComment (comment) {
      Vue.set(comment, 'expanded', false)
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
.comment-box {
  border-bottom: 1px solid #CCC;
}

.reply-box {
  border-top: 1px solid #CCC;
}

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