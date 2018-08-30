<template>
  <v-layout row align-center>
    <v-avatar size="38px">
      <img :src="comment.author_img" alt="">
    </v-avatar>
    <div>
      <v-layout class="ml-2" column>
        <strong class="text-dark mb-0">{{comment.author}}</strong>
        <v-tooltip top>
          <span class="fs-xs text-gray" slot="activator">{{comment.created_at | fromnow }} </span>
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