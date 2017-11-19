<script>

import AppApi from '~apijs'
import Course from '~/components/Course.vue'

export default {
  components: {Course},
  head(){
    return {
      title: "evolutio - "+this.course.name,
      meta: [
        {property: 'og:url', content: 'http://evolutio.io/curso/'+this.course.code},
        {property: 'og:type', content: 'video.tv_show'},
        {property: 'og:title', content: this.course.name},
        {property: 'og:description', content: this.course.description},
        {property: 'og:image', content: 'http://evolutio.io'+this.bannersrc},
      ]
    }
  },
  asyncData (context) {
    return AppApi.get_course(context.params.code).then((response) => {
      return {course: response.data}
    });
  },
  data () {
    return {
    };
  },
  computed: {
    bannersrc(){
      return this.course.banner || '/images/desert.jpg';
    },
  },
}
</script>

<style scoped >
</style>


<template>
  <Course :course="course"></Course>
</template>


