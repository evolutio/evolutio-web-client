<template>
  <div class="header">
    <div class="header--wrapper">
      <router-link class="header--logo" to="/"><img src="/images/evolutio-white.svg" alt="Evolutio"></router-link>
      
      <ul class="header--menu">
        <li><a class="header--menu-item" href>Sobre</a></li>
        <li v-if="!logged_user"><a class="header--menu-item header--menu-login" href="javascript:void(0)" v-on:click="open_login_dialog($event)">Login</a></li>
      </ul>
    </div>

    <LoginDialogSocial ref="login_dialog_social"></LoginDialogSocial>
    <LoginDialog ref="login_dialog"></LoginDialog>
  </div>
    
    <!-- 
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col>
          <el-menu-item index="1"><img src=""/></el-menu-item>
        </el-col>
        <el-col>
          <el-submenu index="2">
            <template slot="title">Cursos</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
          </el-submenu>

          <el-menu-item index="2-1">Sobre</el-menu-item>

          <el-menu-item>
            <el-button   type="text">Login</el-button>

            <el-submenu v-if="logged_user">
              <template slot="title">{{logged_user.first_name}}</template>
              <el-menu-item :router="true" :to="{name: 'perfil'}">Perfil</el-menu-item>
              <el-menu-item @click="logoff()">Log off</el-menu-item>
            </el-submenu>
          </el-menu-item>
        </el-col>
      </el-row>
    </el-menu> -->

</template>

<style scoped>
  .header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  .header--wrapper {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .header--logo {
    padding: 20px 0;
  }

  .header--menu {
    list-style: none;
  }

  .header--menu li { 
    float: left;
  }

  .header--menu-item {
    text-decoration: none;
    color: #fff;
    display: block;
    padding: 10px 20px;
    margin: 10px 0;
  }

  .header--menu-login {
    border: 1px solid #fff;
    border-radius: 5px;
  }

</style>

<script>
import Vuex from 'vuex'
import AppApi from '~apijs'

import LoginDialogSocial from '~/components/LoginDialogSocial.vue'
import LoginDialog from '~/components/LoginDialog.vue'

export default {
  computed: Object.assign(
    {},
    Vuex.mapGetters([
      'logged_user'
    ])
  ),
  components: {LoginDialogSocial, LoginDialog},
  data () {
    return {

    };
  },
  methods: {
    open_login_dialog(evt){
      if(process.env.API_MOCK == '1'){  // nao adianta inspecionar process.env no debug. so dando print
        this.$refs.login_dialog.open();
      } else {
        this.$refs.login_dialog_social.open();
      }
      evt.stopPropagation();
    },
    logoff(){
      AppApi.logout().then(()=>{
        this.$store.commit('SET_LOGGED_USER', null);
      });
    }
  },
}
</script>

