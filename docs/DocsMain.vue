<template>
  <DocsMainLayout :menuitems="menuitems">
    <router-view></router-view>
  </DocsMainLayout>
</template>

<script>
import VueRouter from 'vue-router'
import Vue from 'vue'
import DocsMainLayout from './DocsMainLayout.vue'
import DocsRegistry from './docs-registry'

export default {
  data () {

    var children = DocsRegistry.components.map(c => {
        return {label: c.name, routerpath: '/view/'+c.name}
    });
    return {
      menuitems: [
        {
            icon: 'tachometer', 
            label: 'Components', 
            expanded: true,
            children: children,
        }
      ],
    }
  },
  components: {DocsMainLayout}
}
</script>

<style lang="scss">
@import '~bulma';
@import '~font-awesome/css/font-awesome.css';
@import '~animate.css';
</style>
