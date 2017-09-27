<template>
  <main>
    <v-container fluid class="main-content">
      <v-card>
        <v-card-media :src="bannersrc" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{course.name}}</h3>
            <div>{{course.description}}</div>
            <div v-if="course.price > 0 && !course.owned">
              <v-chip class="orange white--text" >
                Este é um curso com conteúdo exclusivo
                <v-icon right>star</v-icon>
              </v-chip>
              <v-btn round primary dark @click.native="iniciar_compra($event)">Comprar acesso completo ({{course.price | currency('R$')}})</v-btn>
            </div>
            
          </div>
        </v-card-title>
      </v-card>

      <v-tabs v-model="active" class="my-3">
        <v-tabs-bar class="tabs-bar">
          <v-tabs-item key="material" href="#material" ripple>
            Material
          </v-tabs-item>
          <v-tabs-item key="discussao" href="#discussao" ripple>
            Discussão
          </v-tabs-item>
          <v-tabs-slider class="red"></v-tabs-slider>
        </v-tabs-bar>
        <!-- <v-card class="my-3"> -->
          <v-tabs-content key="material" id="material">
            <v-list two-line subheader>
              <v-list-tile v-for="content in course.contents" :key="content.id">
                <v-list-tile-avatar>
                  <v-icon v-if="content.kind == 'youtube' || content.kind == 'vimeo'" class="grey white--text">ondemand_video</v-icon>
                  <v-icon v-if="content.kind == 'RESTRICTED'" class="grey white--text">https</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-if="content.kind != 'RESTRICTED'" class="video-link" @click="open_content(content, $event)">{{ content.name }}</v-list-tile-title>
                  <v-list-tile-title v-if="content.kind == 'RESTRICTED'" >{{ content.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-tabs-content>
        <!-- </v-card> -->
        <v-tabs-content key="discussao" id="discussao">
          <FacebookComments :path="'/curso/'+course.code"></FacebookComments>
        </v-tabs-content>
      </v-tabs>

    </v-container>
    <v-dialog v-model="dialog_precompra" lazy absolute>
      <v-card>
        <v-card-title>
          <div class="headline">Comprar acesso completo</div>
        </v-card-title>
        <v-card-text>
          <p>Comprando o acesso completo a este curso, você terá acesso ao conteúdo exclusivo por pelo menos 6 meses.</p>
          <p>Nós vamos te direcionar para o PagSeguro e assim que a gente confirmar o pagamento, a gente te manda um email, e daí o conteúdo fica liberado pra vc</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="green--text darken-1" flat="flat" @click.native="compra_pagseguro()">Vamos nessa</v-btn>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog_precompra = false">Deixa pra lá</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_poscompra" lazy absolute>
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
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog_precompra = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <YoutubeDialog></YoutubeDialog>
    <VimeoDialog></VimeoDialog>

  </main>
</template>

<script>

import AppApi from '~apijs'
import Vuex from 'vuex'
import YoutubeDialog from '~/components/YoutubeDialog.vue'
import VimeoDialog from '~/components/VimeoDialog.vue'
import FacebookComments from '~/components/FacebookComments.vue'
import Toasts from '~/components/Toasts.js'

export default {
  asyncData (context) {
    return AppApi.get_course(context.params.code).then((response) => {
      return {course: response.data}
    });
  },
  data () {
    return {
      active: 'material',
      tabs: ['tab-1', 'tab-2', 'tab-3'],
      nactive: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      dialog_precompra: false,
      dialog_poscompra: false,
    };
  },
  computed: Object.assign({
    bannersrc(){
      return this.course.banner || '/images/desert.jpg';
    }
  }, Vuex.mapGetters([
    'logged_user',
  ])),
  methods: {
    open_content(content, evt){
      debugger
      if(content.kind == 'youtube'){
        YoutubeDialog.data().open(content);
      } else if(content.kind == 'vimeo'){
        VimeoDialog.data().open(content);
      }
      evt.stopPropagation();
    },
    iniciar_compra(evt){
      this.dialog_precompra = true;
      evt.stopPropagation();
    },
    compra_pagseguro(){
      AppApi.get_paycode(this.course.code).then((response) => {
        var code = response.data.checkout.code;
        var suporta_lightbox = PagSeguroLightbox({code: code}, {success : onsuccess, abort : onabort});
        function onsuccess(transactionCode) {
          this.dialog_poscompra = true;
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
  head(){
    return {
      title: "evolutio - "+this.course.name,
      meta: [
        {property: 'og:url', content: 'http://evolutio.io/curso/'+this.course.code},
        {property: 'og:type', content: 'video.tv_show'},
        {property: 'og:title', content: this.course.name},
        {property: 'og:description', content: this.course.description},
        {property: 'og:image', content: 'http://evolutio.io'+this.bannersrc},
      ]
    }
  },
  components: {YoutubeDialog, VimeoDialog, FacebookComments},
}
</script>

<style scoped >
  .main-content{
    max-width: 900px
  }
  .tabs-bar{
    background-color: white;
  }
  .video-link:hover{
    cursor: pointer;
    text-decoration: underline;
  }

</style>