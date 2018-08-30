<template>
  <v-snackbar v-model="opened" :timeout="timeout" :color="color">
    {{message}}
    <v-btn flat dark @click.native="close">Fechar</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    opened: {
      get () {
        return this.$store.state.toast.opened
      },
      set () {
        this.$store.commit('toast/close')
      }
    },
    message () {
      return this.$store.state.toast.message
    },
    timeout () {
      return this.$store.state.toast ? this.$store.state.toast.timeout : 6000
    },
    color () {
      return this.$store.state.toast.color
    }
  },
  methods: {
    close () {
      this.$store.commit('toast/close')
    }
  }
}
</script>
