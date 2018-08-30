<template>
  <v-layout class="mb-2" row>
    <v-flex>
      <div class="clickable" @click="viewComment">
        <v-avatar size="20px" class="mr-1">
          <img :src="comment.author_img">
        </v-avatar>
        <strong class="mr-2">{{comment.author.split(' ')[0]}}</strong>
        <span>{{comment.text | trim(size || 100)}}</span>
      </div>
      <p class="mb-1">
        <v-tooltip top>
          <span class="fs-xs text-gray mr-2" slot="activator">{{comment.created_at | fromnowshort }} </span>
          <span>{{comment.created_at | datetime}}</span>
        </v-tooltip>
        <a class="link" @click="replyComment">Responder</a>
        <a class="link ml-2" v-if="logged_user && comment.author_id == logged_user.id" @click="editComment"> Editar</a>
      </p>
    </v-flex>
  </v-layout>
</template>

<script>
import Vuex from 'vuex'

export default {
  props: ['comment', 'replyTo', 'size'],
  computed: {
    ...Vuex.mapGetters([
      'logged_user',
    ]),
  },
  methods: {
    viewComment () {
      this.$emit('viewComment', this.comment)
      console.log('abre')
    },
    replyComment () {
      this.$emit('viewComment', this.comment)
      console.log('responde')
    },
    editComment () {
      this.$emit('viewComment', this.comment)
      console.log('edita')
    },
  }
}
</script>