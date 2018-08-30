<template>
  <v-layout row align-center>
    <v-avatar size="20px">
      <img :src="comment.author_img" alt="">
    </v-avatar>
    <div>
      <v-layout class="ml-2" row>
        <strong class="fs-s text-dark">{{comment.author}}</strong>
        <v-tooltip top>
          <span class="fs-xs text-gray ml-2" slot="activator">{{comment.created_at | fromnow }} </span>
          <span>{{comment.created_at | datetime}}</span>
        </v-tooltip>
      </v-layout>
    </div>
  </v-layout>
</template>

<script>

export default {
  props: ['comment'],
}
</script>