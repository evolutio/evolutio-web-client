<template>
  <v-layout class="mb-2" row>
    <v-flex>
      <div class="clickable" @click="open">
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
      </p>
    </v-flex>
  </v-layout>
</template>

<script>
import Vuex from 'vuex'

export default {
  props: ['comment'],
  computed: {
    ...Vuex.mapGetters({
      logged_user: 'auth/logged_user',
    }),
  },
  methods: {
    open () {
      this.$emit('open', this.comment)
    }
  }
}
</script>