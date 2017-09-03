<template>
  <main>
    <!-- <v-content> -->
      <v-container fluid class="main-content">
        <v-card>
          <v-card-media :src="bannersrc" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{course.name}}</h3>
              <div>{{course.description}}</div>
            </div>
          </v-card-title>
        </v-card>

        <v-tabs v-model="active" class="my-3">
          <v-tabs-bar class="tabs-bar">
            <v-tabs-item key="material" href="#material" ripple>
              Material
            </v-tabs-item>
            <v-tabs-item key="discussao" href="#discussao" ripple>
              Discussão
            </v-tabs-item>
            <v-tabs-slider class="red"></v-tabs-slider>
          </v-tabs-bar>
          <!-- <v-card class="my-3"> -->
            <v-tabs-content key="material" id="material">
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
            </v-tabs-content>
          <!-- </v-card> -->
          <v-tabs-content key="discussao" id="discussao">
            <FacebookComments></FacebookComments>
          </v-tabs-content>
        </v-tabs>

      </v-container>
    <!-- </v-content> -->
    <YoutubeDialog></YoutubeDialog>
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
      active: 'material',
      tabs: ['tab-1', 'tab-2', 'tab-3'],
      nactive: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    };
  },
  computed: Object.assign({
    bannersrc(){
      return this.course.banner || '/images/desert.jpg';
    }
  }, Vuex.mapGetters([
    'logged_user',
  ])),
  methods: {
    open_content(content, evt){
      YoutubeDialog.data().open(content);
      evt.stopPropagation();
    },
  },
  components: {YoutubeDialog, FacebookComments},
}
</script>

<style scoped >
  .main-content{
    max-width: 900px
  }
  .tabs-bar{
    background-color: white;
  }

</style>