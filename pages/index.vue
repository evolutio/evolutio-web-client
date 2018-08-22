<template>
  <main>
    <v-container grid-list-lg>
      <section class="py-4">
        <v-card style="height: 100%">
          <v-card-media height="auto" :src="featuredCourse.thumbnail">
            <v-container style="background-color: #00000066" fill-height fluid pa-5>
              <v-layout fill-height align-center>
                <v-flex xs12 align-end flexbox>
                  <div class="h1 text-light clickable" @click="open(featuredCourse)">{{ featuredCourse.name}}</div>
                  <div class="mt-2 fs-m fw-light text-light" style="opacity: 0.8">{{ featuredCourse.description}}</div>
                  <div class="text-light fs-sm mt-2" style="opacity: 0.6">por <strong>{{ featuredCourse.teachers }}</strong></div>
                  <v-btn class="mt-4 mx-0" color="secondary" depressed large @click="open(featuredCourse)">Ver curso</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
        </v-card>
      </section>
      <section>
        <h2 class="py-3">Todos os cursos disponíveis</h2>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg3 xl2 v-for="course in courses" :key="course.code">
            <v-card style="height: 100%">
              <v-card-media height="200px" :src="course.thumbnail" @click="open(course)" class="clickable">
                <v-layout class="hover-card full-height full-width pa-0 ma-0" align-center justify-center>
                  <v-btn class="fw-bold" dark depressed @click="open(course)">Ver curso</v-btn>
                </v-layout>
              </v-card-media>
              <v-card-title>
                <v-layout class="pa-3" column>
                  <v-layout row style="height: 60px; overflow: hidden" align-center>
                    <h4>{{ course.name | trim(50)}}</h4>
                  </v-layout>
                  <v-layout row style="height: 80px; overflow: hidden" align-start>
                    <div class="mt-2 fs-s">{{ course.description | trim(80) }}</div>
                  </v-layout>
                  <v-layout row wrap>
                    <v-avatar size="24">
                      <img :src="course.teacher_avatar" alt="alt">
                    </v-avatar>
                    <span class="fw-bold ml-2 text-dark">{{ course.teachers }}</span>
                  </v-layout>
                </v-layout>
              </v-card-title>
              <v-card-actions class="pa-0">
                <v-btn class="ma-0" color="secondary" flat large block @click="open(course)">Ver curso</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </section>
    </v-container>
  </main>
</template>

<script>

import AppApi from '~apijs'

export default {
  asyncData(ctx) {
    return AppApi.list_courses().then((response) => {
        return {
          featuredCourse: response.data[0],
          courses: response.data
        }
    });
  },
  data(){
    return {
      courses: [],
    }
  },
  mounted () {
    window.TS = this
  },
  methods: {
    open (course) {
      this.$router.push({
        name: 'curso-code',
        params:{code: course.code}
      })
    }
  },
  head(){
    return {
      title: "evolutio - A tecnologia evolui. A gente te ajuda a evoluir junto.",
      meta: [
        {property: 'og:url', content: 'http://evolutio.io'},
        {property: 'og:type', content: 'website'},
        {property: 'og:title', content: 'evolutio - Aprenda tudo o que você vai usar no mundo real'},
        {property: 'og:description', content: 'O conteúdo com a qualidade que você precisa, em um só lugar.'},
        {property: 'og:image', content: 'http://evolutio.io/images/minecraft.png'},
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
  .hover-card {
    background-color: #00000066;
    transition: 0.8s ease;
    opacity: 0;
    &:hover {
      opacity: 1;
    }
  }
</style>
