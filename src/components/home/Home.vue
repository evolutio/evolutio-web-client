<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            evolutio - home
          </h1>
          <h2 class="subtitle">
            Uma mensagem bem motivante!
          </h2>
        </div>
      </div>
    </section>
    <span v-if="loading">Carregando...</span>
    <table>
      <tr>
        <th>Curso</th>
        <th>Instrutores</th>
        <th>Descrição</th>
      </tr>
      <tr v-for="course in courses">
        <td><router-link :to="{name: 'course', params: {code: course.code}}">{{course.name}}</router-link></td>
        <td>{{course.teachers}}</td>
        <td>{{course.description}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import AppApi from 'apijs'

var DATA = {
  loading: false,
  courses: []
}

export default {
  name: 'Home',
  data () {
    this.list_courses
    return DATA;
  },
  methods: {
    list_courses(){
      this.loading = true;
      return AppApi.list_courses().then(({data}) => {
        this.courses = data;
        this.loading = false;
      });
    }
  },
  created(){
    if(this.courses.length == 0){
      this.list_courses();
    }
  }
}
</script>

<style lang="scss">
</style>

<style scoped lang="scss">
</style>
