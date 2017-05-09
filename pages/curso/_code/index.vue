<template>
  <main>

    <v-card class="ma-5">
      <v-card-text>
        <h2>{{course.name}}</h2>
        <h3>{{course.description}}</h3>
      </v-card-text>
    </v-card>
    <button @click=go()>Go</button>
    <button @click=g()>G</button>


  </main>
</template>

<script>

import AppApi from '~apijs'
import Vuex from 'vuex'

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
    'r'
  ]),
  methods: {
    go(){
      AppApi.list_courses().then((response) => {
        console.log(response);
      });
    },
    g(){
      console.log(this.r)
    }
  }
}
</script>
