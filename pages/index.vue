<template>
  <el-main class="main"> 
    <div class="hero">
      <h2>A tecnologia evolui.</h2>
      <h3>A gente te ajuda a evoluir junto.</h3>
      <p>Evolutio oferece a você cursos de tecnologia para o mundo real</p>

      <el-button type="warning">Crie sua conta grátis</el-button>
    </div>

    <div class="content">
      <div class="section">
        <h4 class="section--title">Cursos</h4>

        <el-row type="flex" gutter="20" justify="center">
          <el-col :key="course.code" v-for="course in courses" :router="true" :to="{name: 'curso-code', params:{code: course.code}}">
            <el-card class="box-card">
              <div slot="header">
                <img v-if="course.icon" :src="course.icon" width="30">
                <div>
                  <h5>{{ course.name }}</h5>
                  <small>{{ course.teachers }}</small>
                </div>
              </div>
              
              <p>{{ course.description }}</p>
              <el-button type="text" class="button">Começar</el-button>
            </el-card>
          </el-col>
        </el-row> 
      </div>
    </div>
  </el-main>
</template>


<style scoped>
  .main {
    padding: 0;
    
  }

  .hero {
    text-align: center;
    color: #fff;
    height: 500px;
    padding-top: 150px;
    background-image: linear-gradient(140deg, rgba(2, 89, 210, .8) 0%,rgba(1, 67, 167, .9) 100%), url("/images/hero-bg-1.jpeg");
    background-size: cover;
  }

  .content {
    max-width: 1000px;
    margin: 0 auto;
  }

  .section {
    padding: 60px 0;
  }

  .section--title {
    text-align: center;
    margin-bottom: 30px;
  }

  .box-card {
    height: 300px;
  }
</style>


<script>

import AppApi from '~apijs'

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
