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
    <div v-if="!loading" v-for="comment in forum.comments" :key="comment.id">
      <v-flex xs2 sm1 class="mt-3">
        <v-avatar size="48px">
          <img :src="comment.author_img" alt="">
        </v-avatar>
      </v-flex>
      <v-flex xs10 sm11 class="grey lighten-2 mt-3 px-3 pt-3 pb-1 rounded">
        <p>
          <strong>{{comment.author}}</strong>,
          <!-- <span v-tooltip:top="{ html: asdatetime(comment.created_at) }">{{comment.created_at | fromnow}}</span> -->
          <v-tooltip top>
            <span slot="activator">{{comment.created_at | fromnow}}</span>
            <span>{{asdatetime(comment.created_at)}}</span>
          </v-tooltip>
        </p>
        <vue-markdown class="comment-text" :source="comment.text"/>
        <p class="mb-1">
          <a class="link" @click="goreply(comment, $event)">Responder</a>
          <a class="link" v-if="logged_user && comment.author_id == logged_user.id" @click="goedit(comment, $event)"> Editar</a>
        </p>
      </v-flex>
      <div v-for="(reply, rindex) in comment.replies" :key="reply.id">
        <v-flex xs1></v-flex>
        <v-flex xs2 sm1 class="mt-3">
          <v-avatar size="36px">
            <img :src="reply.author_img" alt="">
          </v-avatar>
        </v-flex>
        <v-flex xs9 sm10 class="grey lighten-2 mt-3 px-3 pt-3 pb-1 rounded">
          <p>
            <strong>{{reply.author}}</strong>, 
            <v-tooltip top>
              <span slot="activator">{{reply.created_at | fromnow}}</span>
              <span>{{asdatetime(comment.created_at)}}</span>
            </v-tooltip>
          </p>
          <vue-markdown class="comment-text" :source="reply.text"/>
          <p>
            <a v-if="rindex == comment.replies.length-1" class="link" @click="goreply(comment, $event)">Responder</a>
            <a class="link" v-if="logged_user && reply.author_id == logged_user.id" @click="goedit(reply, $event)"> Editar</a>
          </p>
        </v-flex>
      </div>
      <div :ref="'end_'+comment.id"></div>
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
import TextareaDialog from '~/components/TextareaDialog.vue'
import moment from 'moment'
import VueMarkdown from 'vue-markdown'
import forumhelper from '~/helpers/forumhelper.js'


export default {
  props: ['forum'],
  components: {
    VueMarkdown,
    TextareaDialog
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