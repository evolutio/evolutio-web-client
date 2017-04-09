<template>
  <div id="main">
    <TopNavbar></TopNavbar>
    <section class="app-main">
      <slot></slot>
    </section>
  </div>
</template>

<script>
import TopNavbar from './TopNavbar.vue'

export default {
  data () {
    return {
    };
  },
  props: [
    'menuitems'
  ],
  methods: {
  },
  components: {
    TopNavbar,
  }
}
</script>

<style lang="scss">
</style>

<style scoped lang="scss">
  .app-main {
      padding-top: 50px;
      margin-left: 180px;
      transform: translateZ(0)
  }

  @media screen and (max-width: 768px) {
      .app-main {
          margin-left:0
      }
  }

</style>
