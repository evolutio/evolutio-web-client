<template>
  <div>
    <div v-if="!course">
      carregando...
    </div>
    <div v-if="course">
      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              {{course.name}}
            </h1>
            <h2 class="subtitle">
              {{course.description}}
            </h2>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import AppApi from 'apijs'

export default {
  name: 'Course',
  data () {
    return {
      course: null
    };
  },
  methods: {
    load(){
      return AppApi.get_course(this.$route.params.code).then(({data}) => {
        this.course = data;
      });
    }
  },
  created(){
    this.load();
  }
}
</script>

<style lang="scss">
</style>

<style scoped lang="scss">
</style>
