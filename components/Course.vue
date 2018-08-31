<template>
  <main>
    <section class="banner-section" :style="{ backgroundImage: `url('${bannersrc}')` }">
      <v-container class="py-5">
        <v-layout class="py-5" justify-center column>
          <h1 class="text-white">{{course.name}}</h1>
          <div class="mt-2 fs-m fw-light text-light" style="opacity: 0.8">{{ course.description}}</div>
        </v-layout>
      </v-container>
    </section>
    <section class="bg-super-light">
      <v-container>
        <v-layout row align-center>
          <div>
            <v-avatar size="42">
              <img :src="course.teacher_avatar" alt="alt">
            </v-avatar>
            <span class="fw-bold ml-2 fs-sm text-dark">{{ course.teachers }}</span>
          </div>
          <v-spacer />
          <div v-if="course.price > 0 && !course.owned">
            <v-layout column align-center>
              <v-btn primary color="secondary" @click.native="iniciar_compra($event)">Comprar agora</v-btn>
              <v-layout class="ma-0" row align-center>
                <div v-if="course.old_price" class="crossed pr-2">{{course.old_price | reais}}</div>
                <div v-if="course.price" class="text-secondary fw-bold">{{course.price | reais}}</div>
              </v-layout>
            </v-layout>
          </div>
        </v-layout>
      </v-container>
    </section>
    <v-tabs :class="activeTab === 'tab-contents' ? 'hide-tabs' : 'show-tabs'" v-model="activeTab" class="bg-super-light" color="transparent" centered fixed-tabs slider-color="secondary">
      <v-tab class="fs-sm fw-bold" href="#tab-contents" ripple>Materiais</v-tab>
      <v-tab class="fs-sm fw-bold" href="#tab-comments" ripple>Discussão</v-tab>
    </v-tabs>
    <v-tabs-items v-model="activeTab">
      <v-tab-item id="tab-contents">
        <section class="bg-white">
          <v-container>
            <v-layout row>
              <v-flex xs12 md8>
                <h2 class="my-4 clickable" @click="activeTab = 'tab-contents'">Material do curso</h2>
                <Contents :course="course" @iniciarCompra="iniciar_compra" />
              </v-flex>
              <div class="mx-3" hidden-xs></div>
              <v-flex md4 hidden-sm-and-down>
                <h2 class="my-4 clickable" @click="activeTab = 'tab-comments'">Discussão</h2>
                <CommentsSmall :forum="course" @open="openComment" />
              </v-flex>
            </v-layout>
          </v-container>
        </section>
      </v-tab-item>
      <v-tab-item id="tab-comments">
        <section>
          <v-container>
            <v-layout row>
              <v-flex xs12>
                <Comments :forum="course" ref="comments" />
              </v-flex>
            </v-layout>
          </v-container>
        </section>
      </v-tab-item>
    </v-tabs-items>
    <DialogCompra ref="dialog_compra" />
  </main>
</template>


<script>
import AppApi from '~apijs'
import Vuex from 'vuex'
import CommentsSmall from '~/components/forum/CommentsSmall'
import moment from 'moment'
import Comments from '~/components/forum/Comments'
import Contents from '~/components/course/Contents'
import DialogCompra from '~/components/compra/DialogCompra'

export default {
  components: {
    CommentsSmall,
    Comments,
    Contents,
    DialogCompra
  },
  props: ['course'],
  data () {
    return {
      activeTab: 'tab-contents'
    }
  },
  computed: {
    ...Vuex.mapGetters({
      logged_user: 'auth/logged_user',
    }),
    bannersrc(){
      return this.course.banner || '/images/desert.jpg';
    }
  },
  mounted () {
    window.moment = moment
  },
  methods: {
    iniciar_compra (evt) {
      this.$refs.dialog_compra.show(this.course);
    },
    openComment (params) {
      this.activeTab = 'tab-comments'
      this.$refs.comments.open(params)
    }
  }
}
</script>

<style lang="scss" scoped >
  .banner-section {
    background-size: cover;
  }
  .main-content{
    max-width: 900px
  }
  .hide-tabs {
    @media screen and (min-width: 960px) {
      display: none;
    }
  }
  .show-tabs {
    display: block;
  }
</style>

