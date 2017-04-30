<template>
  <main>

    <v-card class="ma-5">
      <v-card-text>
        <h2>{{course.name}}</h2>
        <h3>{{course.description}}</h3>
      </v-card-text>
    </v-card>


  </main>
</template>

<script>

//TODO: importar isso aqui de um alias sem ../../../../../..
import AppApi from '../../../components/api/apimock.js'

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
}
</script>
