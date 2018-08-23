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
<!--           <div v-if="course.price > 0">
            <v-chip small class="orange white--text" >
              Conteúdo exclusivo
              <v-icon right>star</v-icon>
            </v-chip>
          </div> -->
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
    <section class="bg-white">
      <v-container>
        <v-layout row>
          <v-flex xs9>
            <h2 class="my-4">Material do curso</h2>
            <v-list two-line>
              <template v-for="(content, index) in course.contents">
                <v-divider v-if="index > 0" :key="index" />
                <v-list-tile :key="content.id" @click="open_content(content, $event)">
                  <v-list-tile-avatar>
                    <v-icon :color="content_icon(content).color">{{content_icon(content).icon}}</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title
                      class="fw-bold"
                      :class="content.kind === 'RESTRICTED' ? 'text-inactive' : 'text-primary'"
                    >
                      {{ content.name }}
                    </v-list-tile-title>
                    <v-list-tile-sub-title v-if="content.duration">{{ content.duration | time }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action v-if="content.kind === 'RESTRICTED'">
                    <v-btn icon ripple>
                      <v-icon color="orange lighten-1">star</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>
          </v-flex>
          <div class="mx-3" hidden-xs></div>
          <v-flex xs3>
            <h2 class="my-4">Discussão</h2>
            <CommentsSmall :forum="course" />
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <v-dialog v-model="dialog_precompra" lazy absolute max-width="500px">
      <v-card>
        <v-card-title>
          <div class="headline">Comprar acesso completo</div>
        </v-card-title>
        <v-card-text>
          <p>Comprando o acesso completo a este curso, você terá acesso ao conteúdo exclusivo por pelo menos 6 meses.</p>
          <p>Vamos te direcionar para o PagSeguro e logo que a transação for confirmada o conteúdo fica liberado pra você.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn primary dark @click.native="compra_pagseguro()" :loading="loading_pagseguro">Vamos nessa</v-btn>
          <v-btn normal dark @click.native="dialog_precompra = false">Agora não</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_poscompra" lazy absolute max-width="500px">
      <v-card>
        <v-card-title>
          <div class="headline">Obrigado pela compra</div>
        </v-card-title>
        <v-card-text>
          <p>Obrigado pela sua compra!</p>
          <p>O acesso ao conteúdo é liberado assim que o pagamento é confirmado. Isso costuma levar alguns minutos pra pagamento com cartão, ou de 2 a 3 dias pra pagamento com boleto.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn normal dark @click.native="dialog_precompra = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_breve" lazy absolute max-width="500px">
      <v-card>
        <v-card-title>
          <div class="headline">Em breve!</div>
        </v-card-title>
        <v-card-text>
          <p>Esse conteúdo ainda não está disponível.</p>
          <p>Faça login pra receber nossas atualizações de conteúdo.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn normal dark @click.native="dialog_breve = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <VideoDialog :course="course" ref="video_dialog"></VideoDialog>
  </main>
</template>


<script>
import AppApi from '~apijs'
import Vuex from 'vuex'
import VideoDialog from '~/components/VideoDialog'
import CommentsSmall from '~/components/CommentsSmall'
import Toasts from '~/components/Toasts.js'
import moment from 'moment'

export default {
  props: ['course'],
  data () {
    return {
      active: 'material',
      dialog_precompra: false,
      dialog_poscompra: false,
      dialog_breve: false,
      loading_pagseguro: false,
    };
  },
  computed: {
    ...Vuex.mapGetters([
      'logged_user',
    ]),
    bannersrc(){
      return this.course.banner || '/images/desert.jpg';
    }
  },
  mounted () {
    window.moment = moment
  },
  methods: {
    open_content (content, evt){
      if(content.kind == 'RESTRICTED'){
        this.iniciar_compra(evt);
      } else if(content.kind == 'SOON'){
        this.dialog_breve = true;
      } else {
        this.$refs.video_dialog.open(content)
      }
      evt.stopPropagation();
    },
    iniciar_compra (evt){
      this.dialog_precompra = true;
      evt.stopPropagation();
    },
    content_icon (content) {
      if (content.kind in {youtube: 1, vimeo: 1}) {
        return { color: 'blue', icon: 'ondemand_video' }
      }
      if (content.kind === 'RESTRICTED') {
        return { color: 'grey', icon: 'https' }
      }
      if (content.kind === 'SOON') {
        return { color: 'blue', icon: 'personal_video' }
      }
      return { color: 'grey', icon: 'note' }
    },
    compra_pagseguro (){
      if(!this.$store.state.logged_user){
        Toasts.show('Você precisa fazer login antes!', {timeout: 3000});
        return;
      }
      if(!this.$store.state.logged_user.last_name){
        Toasts.show('Antes de fazer esta compra, você precisa completar as informações do seu perfil', {timeout: 5000});
        return;
      }
      this.loading_pagseguro = true;
      AppApi.get_paycode(this.course.code).then((response) => {
        this.loading_pagseguro = false;
        this.dialog_precompra = false;
        var code = response.data.checkout.code;
        var suporta_lightbox = PagSeguroLightbox({code: code}, {success : onsuccess, abort : onabort});
        function onsuccess(transactionCode) {
          this.dialog_poscompra = true;
          console.log('pagseguro success');
        }
        function onabort(){
          Toasts.show('Compra cancelada', {timeout: 3000});
        }
        if (!suporta_lightbox){
          throw new Error('nao suporta light box do pagseguro')
        }
      });
    }
  },
  components: {VideoDialog, CommentsSmall},
}
</script>

<style lang="scss" scoped >
  .banner-section {
    background-size: cover;
  }
  .main-content{
    max-width: 900px
  }
  .tabs-bar{
    background-color: white;
  }
  .video-link{
    color: #1976d2
  }
  .video-link:hover{
    cursor: pointer;
    text-decoration: underline;
  }
</style>

