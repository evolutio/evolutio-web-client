<template>
  <main>
    <v-content>
      <v-container fluid>

        <v-card class="ma-5">
          <v-card-text>
            <h2>Evolutio - descubra o poder da programação.</h2>
          </v-card-text>
        </v-card>

        <v-card id="course-list" class="ma-5">
          <v-toolbar class="light-blue">
            <v-toolbar-title>Cursos</v-toolbar-title>
          </v-toolbar>
          <v-list two-line subheader>
            <v-list-item v-for="course in courses" :key="course.code">
              <v-list-tile avatar :router="true" :href="{name: 'curso-code', params:{code: course.code}}">
                <v-list-tile-avatar>
                  <v-icon class="grey white--text">folder</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ course.name }}, com <strong>{{ course.teachers }}</strong></v-list-tile-title>
                  <v-list-tile-sub-title>{{ course.description }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-item>
          </v-list>
        </v-card>

      </v-container>
    </v-content>
    <FacebookComments></FacebookComments>
  </main>
</template>

<script>

import AppApi from '~apijs'
import FacebookComments from '~components/FacebookComments.vue'

export default {
  asyncData(ctx) {
    return AppApi.list_courses().then((response) => {
        return {courses: response.data}
    });
  },
  data(){
    return {
      courses: [],
    }
  },
  methods: {
    go_to_course(course){
      // this.
    }
  },
  components: {FacebookComments},
}
</script>

<style scoped>
  .title {
    padding-left: 20px;
  }
</style>
