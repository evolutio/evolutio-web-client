<template>
  <div>
    <v-dialog v-model="visible" width="640">
      <v-card>
          <v-card-title>{{title}}</v-card-title>
          <v-card-text>
            <v-container fluid>
              <v-text-field multi-line :label="label" v-model="value" auto-grow rows="5" hint="Ctrl+enter envia a parada" persistent-hint @keyup.ctrl.enter="ok()" @keyup.esc="close()"/>
            </v-container>
          </v-card-text>
          <v-btn class="blue--text darken-1" flat @click="close()">Cancelar</v-btn>
          <v-btn class="blue--text darken-1" flat @click="ok()" :loading="loading" :disabled="loading">{{action}}</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import AppApi from '~apijs'

export default {
  data () {
    return {
      visible: false,
      title: '',
      label: '',
      value: '',
      action: 'OK',
      actionFunc: null,
      loading: false,
    };
  },
  methods: {
    open(opts){
      opts = opts || {}
      this.visible = true
      this.loading = false
      this.title = opts.title || ''
      this.label = opts.label || ''
      this.value = opts.value || ''
      this.action = opts.action || 'OK'
      this.actionFunc = opts.actionFunc
    },
    close () {
      this.visible = false
      this.loading = false
    },
    ok () {
      this.loading = true
      this.actionFunc(this.value).finally(() => {
        this.close()
      })
    }
  },
}
</script>
