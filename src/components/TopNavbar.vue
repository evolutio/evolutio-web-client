<template>
  <section class="hero is-bold app-navbar animated slideInDown">
    <div class="hero-head">
      <nav class="nav">
        <div class="nav-left">
          <a class="nav-item is-hidden-tablet" @click="toggle_sidebar">
            <i aria-hidden="true" class="fa fa-bars"></i>
          </a>
          <a href="#" class="nav-item">Esquerda</a>
        </div>
        <div class="nav-center">
          <a href="#" class="nav-item">
            <div aria-label="v0.1.9" class="is-hidden-mobile tooltip tooltip--right tooltip--success tooltip--small tooltip--rounded tooltip--always tooltip--no-animate">
              <span class="vue">Teste</span>
              <strong class="admin">Sidebar</strong>
            </div>
          </a>
          <a href="#" class="nav-item">
            Meio
          </a>
        </div> 
        <div class="nav-right is-flex">
          <a href="#" class="nav-item">Login</a>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>

<style>
</style>
