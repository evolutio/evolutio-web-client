<template>
  <section class="hero is-bold app-navbar animated slideInDown">
    <div class="hero-head">
      <nav class="nav">
        <div class="nav-left">
          <a class="nav-item is-hidden-tablet" @click="$emit('menutoggle')">
            <i aria-hidden="true" class="fa fa-bars"></i>
          </a>
          <a href="#" class="nav-item"></a>
        </div>
        <div class="nav-center">
          <a href="#" class="nav-item"></a>
        </div> 
        <div class="nav-right is-flex">
          <a href="#" class="nav-item"></a>
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

<style scoped lang="scss">

  .app-navbar {
      position: fixed;
      min-width: 100%;
      z-index: 1024;
      box-shadow: 0 2px 3px hsla(0,0%,7%,.1),0 0 0 1px hsla(0,0%,7%,.1)
  }

  .nav-right {
      -ms-flex-align: stretch;
      align-items: stretch;
      -ms-flex: 1;
      flex: 1;
      -ms-flex-pack: end;
      justify-content: flex-end;
      overflow: hidden;
      overflow-x: auto;
      white-space: nowrap
  }
</style>
