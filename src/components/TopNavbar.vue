<template>
  <section class="hero is-bold app-navbar animated slideInDown">
    <div class="hero-head">
      <nav class="nav">
        <div class="nav-left">
          <a class="nav-item is-hidden-tablet" @click="$emit('menutoggle')">
            <i aria-hidden="true" class="fa fa-bars"></i>
          </a>
          <router-link class="nav-item" :to="{name: 'home'}">evolutio</router-link>
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
          <a v-if="AuthSvc.state == 'NOT_LOGGED'" href="#" class="nav-item" @click="show_login()">Login</a>
          <div v-if="AuthSvc.state == 'LOGGED'" class="dropdown">
            <a class="nav-item" @click="toggledrop = !toggledrop">{{AuthSvc.logged_user.username}}</a>
            <div class="box" :class="{'is-open': toggledrop}">
              <ul class="menu-list">
                <li>
                  <router-link :to="{name: 'profile'}"><span class="icon is-small"><i class="fa fa-user"></i></span> Perfil</router-link>
                </li>
                <li><a @click="logout()"><span class="icon is-small"><i class="fa fa-sign-out"></i></span> Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import LoginModal from './LoginModal.vue'
import AuthSvc from 'src/services/AuthSvc.js'

export default {
  data () {
    return {
      AuthSvc,
      toggledrop: false,
    }
  },
  methods: {
    show_login(){
      LoginModal.data().show();
    },
    logout(){
      AuthSvc.logout();
    }
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

  .dropdown {
    // position: relative;
    // display: inline-block;

    .box{
      box-shadow: 0 0 8px #777;
      display: none;
      left: 0;
      position: absolute;
      top: 100%;
      z-index: 9999;

      &.is-open {
        display: block;
      }
    }

  }
</style>
