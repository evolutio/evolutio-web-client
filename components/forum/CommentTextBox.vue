<template>
  <v-layout>
    <v-layout v-if="!writing" row align-center>
      <v-avatar size="22px" class="mr-2 mb-3">
        <img v-if="logged_user && logged_user.img" :src="logged_user.img">
        <v-icon v-else>account_circle</v-icon>
      </v-avatar>
      <v-flex>
        <v-text-field
          @click="startWriting"
          :placeholder="placeholder()"
          class="ma-0 py-0"
          :disabled="!logged_user"
        />
      </v-flex>
    </v-layout>
    <v-layout v-else column>
      <v-layout row wrap class="ma-0">
        <v-avatar size="22px" class="mr-2 mb-3">
          <img v-if="logged_user && logged_user.img" :src="logged_user.img">
          <v-icon v-else>account_circle</v-icon>
        </v-avatar>
        <v-text-field
          v-model="text"
          :placeholder="placeholder()"
          class="ma-0 py-0"
          multi-line
          @keyup.ctrl.enter="send()"
          @keyup.esc="close()"
          hint="Ctrl+Enter envia a parada"
          auto-grow
          autofocus
        />
      </v-layout>
      <v-layout row justify-end class="mb-4">
        <v-btn class="text-inactive" @click="close" flat>Cancelar</v-btn>
        <v-btn color="primary" @click="send">Enviar</v-btn>
      </v-layout>
    </v-layout>
  </v-layout>
</template>

<script>
import Vuex from 'vuex'
import Vue from 'vue'

export default {
  props: {
    replyMode: Boolean
  },
  data () {
    return {
      writing: false,
      text: ''
    }
  },
  computed: {
    ...Vuex.mapGetters({
      logged_user: 'auth/logged_user',
    }),
  },
  methods: {
    startWriting () {
      this.writing = true
    },
    close () {
      this.writing = false
    },
    send () {
      this.$emit('send', this.text)
      this.writing = false
      this.text = ''
    },
    placeholder () {
      return this.logged_user ? (this.replyMode ? 'Escreva aqui sua resposta' : 'Escreva aqui seu comentário') : 'Faça login para comentar'
    }
  }
}
</script>