<template>
  <div>
    <v-dialog v-model="visible" max-width="400px">
      <v-card class="pa-4">
        <v-layout row wrap justify-center class="pt-5">
          <img height="36px" src="~/assets/images/evolutio.svg">
        </v-layout>
        <v-layout class="pt-0 mt-0" column>
          <v-text-field box label="Username" required v-model="username"/>
          <v-text-field box label="Password" type="password" required v-model="password" @keyup.enter="login()"/>
          <small style="color: red;" v-if="error">Usuário ou senha inválido</small>
        </v-layout>
        <v-layout column wrap>
          <v-btn block color="primary" @click="login()" :loading="loading" :disabled="loading">Entrar</v-btn>
          <v-btn block flat @click="close()">Cancelar</v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import AppApi from '~apijs'

export default {
  data () {
    console.log('data');
    return {
      visible: false,
      loading: false,
      username: '',
      password: '',
      error: false,
    };
  },
  methods: {
    open(){
      this.visible = true;
      console.log('Open');
    },
    close(){
      this.visible = false;
      console.log('Close');
    },
    login(){
      this.loading = true;
      this.error = false;
      AppApi.login(this.username, this.password).then((result)=>{
        var user = result.data;
        if(user){
          this.$store.commit('auth/SET_LOGGED_USER', user);
          this.visible = false;
          console.log('logged')
        } else {
          this.error = true;
        }
        this.loading = false;
      });
    },
  },
}
</script>
