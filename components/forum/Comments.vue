<template>
  <v-layout row wrap class="my-2">
    
    <v-flex xs12>
      <v-switch label="Acompanhar por email" color="success" v-model="forum.notify_email" @change="toggle_follow()"/>
    </v-flex>

    <CommentTextBox @send="addComment" ref="addComment" />

    <div v-if="!loading" v-for="comment in forum.comments" :key="comment.id" class="comment-box pt-3 full-width" :id="`comment-${comment.id}`">
      <v-layout column class="focusable" :class="{focused: comment.focused}">
        <v-layout row align-center class="my-2">
          <AuthorSnippet :comment="comment"/>
          <div>
            <v-btn color="secondary" v-if="logged_user && comment.author_id == logged_user.id" @click="edit(comment)" flat small>
              <v-icon class="mr-2 fs-sm">edit</v-icon>
              Editar
            </v-btn>
          </div>
        </v-layout>
        <v-layout wrap full-width>
          <vue-markdown v-if="!comment.editing" class="comment-text" :source="comment.text"/>
          <v-layout column v-else>
            <div>
              <v-text-field 
                v-model="comment.text"
                placeholder="Editar comentário"
                class="ma-0 py-0"
                multi-line
                @keyup.ctrl.enter="save(comment)"
                @keyup.esc="close(comment)"
                hint="Ctrl+Enter envia a parada"
                auto-grow
                autofocus
              />
            </div>
            <v-layout row justify-end class="mb-4">
              <v-btn class="text-inactive" :loading="sending" @click="cancel(comment)" flat>Cancelar</v-btn>
              <v-btn color="primary" :loading="sending" @click="save(comment)">Enviar</v-btn>
            </v-layout>
          </v-layout>
        </v-layout>
      </v-layout>
      <v-layout column>
        <v-layout class="ml-5" column>
          <div class="mb-2">
            <div
              v-for="reply in (comment.showAllReplies ? comment.replies : comment.replies.slice(0, 2))"
              :key="reply.id"
              class="reply-box my-0 focusable"
              :id="`comment-${reply.id}`"
              :class="{
                'my-2': reply.expanded,
                focused: reply.focused
              }"
            >
              <v-layout row wrap align-center :class="reply.expanded ? 'my-2' : 'mt-1'">
                <AuthorSnippetSimple :comment="reply" class="py-1" />
                <v-btn small flat color="grey" class="fs-xs" v-if="logged_user && reply.author_id == logged_user.id" @click="edit(reply)"> <v-icon class="fs-ls mr-2">edit</v-icon>Editar</v-btn>
              </v-layout>
              <v-layout v-if="!reply.editing" column>
                <div v-if="reply.expanded || reply.text.length < 250">
                  <vue-markdown class="comment-text fs-ls" :source="reply.text"/>
                  <a v-if="reply.expanded" class="fs-ls" @click="hideComment(reply)">Ler menos</a>
                </div>
                <span v-else @click="expandComment(reply)" class="clickable">
                  {{comment.text | trim(250)}}
                  <a class="fs-ls" @click="expandComment(reply)">Ler tudo</a>
                </span>
              </v-layout>
              <v-layout column v-else>
                <div>
                  <v-text-field 
                    v-model="reply.text"
                    placeholder="Editar comentário"
                    class="ma-0 py-0"
                    multi-line
                    @keyup.ctrl.enter="save(reply)"
                    @keyup.esc="close(reply)"
                    hint="Ctrl+Enter envia a parada"
                    auto-grow
                    autofocus
                  />
                </div>
                <v-layout row justify-end class="mb-4">
                  <v-btn class="text-inactive" :loading="sending" @click="cancel(reply)" flat>Cancelar</v-btn>
                  <v-btn color="primary" :loading="sending" @click="save(reply)">Enviar</v-btn>
                </v-layout>
              </v-layout>
            </div>
          </div>
          <v-layout row wrap class="mb-2" justify-center>
            <v-btn color="secondary" v-if="comment.replies.length > 2 && !comment.showAllReplies" @click="showAllReplies(comment)" flat small>
              Ver todas {{comment.replies.length}} respostas
            </v-btn>
          </v-layout>
          <CommentTextBox :ref="`comment-${comment.id}-reply`" :loading="sending" @send="text => replyComment(comment, text)" replyMode />
        </v-layout>
      </v-layout>
    </div>
  </v-layout>
</template>
<script>

import Vue from 'vue'
import Vuex from 'vuex'
import AppApi from '~apijs'
import AuthorSnippet from '~/components/forum/AuthorSnippet'
import CommentTextBox from '~/components/forum/CommentTextBox'
import AuthorSnippetSimple from '~/components/forum/AuthorSnippetSimple'
import moment from 'moment'
import VueMarkdown from 'vue-markdown'


export default {
  props: ['forum'],
  components: {
    VueMarkdown,
    AuthorSnippet,
    AuthorSnippetSimple,
    CommentTextBox
  },
  data: function () {
    return {
      loading: false,
      sending: false
    }
  },
  computed: {
    ...Vuex.mapGetters({
      logged_user: 'auth/logged_user',
    }),
  },
  methods: {
    open (params) {
      const comment = params.comment || {}
      let commentFound = null
      this.forum.comments.forEach(c => {
        if (c.id === comment.id) {
          commentFound = c
        }
        c.replies.forEach(r => {
          if (r.id === comment.id) {
            commentFound = r
            this.showAllReplies(c)
            this.expandComment(r)
          }
        })
      })
      if (commentFound) {
        if (params.showAllReplies) {
          this.showAllReplies(commentFound)
        }
        if (params.reply) {
          const replyComponent = this.$refs[`comment-${commentFound.id}-reply`]
          if (replyComponent) {
            replyComponent[0].startWriting()
          }
        }
        setTimeout(() => {
          this.$vuetify.goTo(`#comment-${comment.id}`, { offset: 300 })
          Vue.set(commentFound, 'focused', true)
        }, 660)
        setTimeout(() => {
          Vue.set(commentFound, 'focused', false)
        }, 3000)
      }
    },
    edit (comment) {
      comment.oldText = comment.text
      Vue.set(comment, 'editing', true)
    },
    toggle_follow () {
      AppApi.follow_course_by_email(this.forum.id, this.forum.notify_email).then(() => {
        if(this.forum.notify_email){
          this.$store.commit('toast/open', {message: 'Você vai receber emails sempre que alguém adicionar um comentário', color: 'success'})
        } else {
          this.$store.commit('toast/open', {message: 'Você não vai mais receber emails com comentários nesta conversa'})
        }
      })
    },
    cancel (comment) {
      comment.text = comment.oldText
      Vue.set(comment, 'editing', false)
    },
    save (comment) {
      Vue.set(comment, 'editing', false)
      AppApi.edit_comment(comment.id, comment.text).then(response => {
        comment.text = response.data.text
      })
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
    },
    showAllReplies (comment) {
      Vue.set(comment, 'showAllReplies', true)
    },
    replyComment (comment, text) {
      const replyComponent = this.$refs[`comment-${comment.id}-reply`]
      if (replyComponent) {
        AppApi.send_comment(this.forum.id, comment.id, text).then(response => {
          comment.replies.push(response.data)
          this.showAllReplies(comment)
          replyComponent[0].reset()
        }).finally(() => {
          replyComponent[0].stop()
        })
      }
    },
    addComment (text) {
      AppApi.send_comment(this.forum.id, null, text).then(response => {
        this.$refs.addComment.reset()
        const newcomment = {...response.data, replies: []}
        this.forum.comments.unshift(newcomment)
      }).finally(() => {
        this.$refs.addComment.stop()
      })
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
  border-top: 2px solid #DDD;
  &:last-child {
    border-bottom: 2px solid #DDD;
  }
}
.reply-box {
  border-top: 1px solid #DDD;
  &:last-child {
    border-bottom: 1px solid #DDD;
  }
}

.focusable {
  transition-duration: 3s;
}

.focused {
  -webkit-box-shadow: 0px 0px 10px 1px rgba(0, 171, 192, 0.7);
  -moz-box-shadow: 0px 0px 10px 1px rgba(0, 171, 192, 0.7);
  box-shadow: 0px 0px 10px 1px rgba(0, 171, 192, 0.7);
  transition-delay: 0.5s;
  transition-duration: 1s;
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