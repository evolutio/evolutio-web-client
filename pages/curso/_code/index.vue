<template>
  <main>
    <v-content>
      <v-container fluid>

        <v-card class="mx-5">
          <v-card-media src="/images/desert.jpg" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{course.name}}</h3>
              <div>{{course.description}}</div>
            </div>
          </v-card-title>
          <!-- <v-card-actions>
            <v-btn flat class="orange--text">Share</v-btn>
            <v-btn flat class="orange--text">Explore</v-btn>
          </v-card-actions> -->
        </v-card>

        <v-card id="content-list" class="mx-5 ma-3">
          <v-toolbar class="light-blue">
            <v-toolbar-title>Conteúdo</v-toolbar-title>
          </v-toolbar>
          <v-list two-line subheader>
            <v-list-item v-for="content in course.contents" :key="content.id">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <v-icon class="grey white--text">ondemand_video</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title @click="open_content(content, $event)">{{ content.name }}</v-list-tile-title>
                  <!-- <v-list-tile-sub-title>{{ course.description }}</v-list-tile-sub-title> -->
                </v-list-tile-content>
              </v-list-tile>
            </v-list-item>
          </v-list>
        </v-card>

      </v-container>
    </v-content>
    <YoutubeDialog></YoutubeDialog>
    <FacebookComments></FacebookComments>
  </main>
</template>

<script>

import AppApi from '~apijs'
import Vuex from 'vuex'
import YoutubeDialog from '~/components/YoutubeDialog.vue'
import FacebookComments from '~/components/FacebookComments.vue'

export default {
  asyncData (context) {
    return AppApi.get_course(context.params.code).then((response) => {
      return {course: response.data}
    });
  },
  data () {
    return {
    };
  },
  computed: Vuex.mapGetters([
    'logged_user',
  ]),
  methods: {
    open_content(content, evt){
      YoutubeDialog.data().open(content);
      evt.stopPropagation();
    },
  },
  components: {YoutubeDialog, FacebookComments},
}
</script>
