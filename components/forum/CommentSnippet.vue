<template>
  <v-layout class="mb-2" row>
    <v-flex>
      <div>
        <v-avatar size="20px" class="mr-1">
          <img :src="comment.author_img">
        </v-avatar>
        <strong class="mr-2">{{comment.author.split(' ')[0]}}</strong>
        <span>{{comment.text | trim(100)}}</span>
      </div>
      <p class="mb-1">
        <v-tooltip top>
          <span class="fs-xs text-gray mr-2" slot="activator">{{comment.created_at | fromnowshort }} </span>
          <span>{{comment.created_at | datetime}}</span>
        </v-tooltip>
        <a class="link" @click="goreply(replyTo || comment, $event)">Responder</a>
        <a class="link" v-if="logged_user && comment.author_id == logged_user.id" @click="goedit(comment, $event)"> Editar</a>
      </p>
    </v-flex>
  </v-layout>
</template>

<script>
import Vuex from 'vuex'

export default {
  props: ['comment', 'replyTo'],
  computed: {
    ...Vuex.mapGetters([
      'logged_user',
    ]),
  }
}
</script>