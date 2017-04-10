<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Perfil
          </h1>
          <h2 class="subtitle">
            {{AuthSvc.logged_user.username}}
          </h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AppApi from 'apijs'
import AuthSvc from 'src/services/AuthSvc.js'

export default {
  name: 'Profile',
  data () {
    return {
      AuthSvc,
    };
  },
  methods: {
  }
}
</script>

<style lang="scss">
</style>

<style scoped lang="scss">
</style>
