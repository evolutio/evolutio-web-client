<script>

import AppApi from '~apijs'
import Vuex from 'vuex'
import VideoDialog from '~/components/VideoDialog.vue'
import Comments from '~/components/Comments.vue'
import Toasts from '~/components/Toasts.js'

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
  methods: {
    open_content(content, evt){
      if(content.kind == 'RESTRICTED'){
        this.iniciar_compra(evt);
      } else if(content.kind == 'SOON'){
        this.dialog_breve = true;
      } else {
        this.$refs.video_dialog.open(content)
      }
      evt.stopPropagation();
    },
    iniciar_compra(evt){
      this.dialog_precompra = true;
      evt.stopPropagation();
    },
    compra_pagseguro(){
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
  components: {VideoDialog, Comments},
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
              <v-chip small class="orange white--text" >
                Conteúdo exclusivo
                <v-icon right>star</v-icon>
              </v-chip>
              <v-btn round small primary dark @click.native="iniciar_compra($event)">Acesso completo ({{course.price | currency('R$')}})</v-btn>
            </div>
            <div v-if="course.price > 0 && course.owned">
              <v-chip small dark class="green white--text" >
                Conteúdo exclusivo
                <v-icon right>star</v-icon>
              </v-chip>
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
            Discussão ({{course.comments.length}})
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
                  <v-icon v-if="content.kind == 'SOON'" class="grey white--text">personal_video</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title class="video-link" @click="open_content(content, $event)">{{ content.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-tabs-content>
        <!-- </v-card> -->
        <v-tabs-content key="discussao" id="discussao">
          <Comments :comments="course.comments"></Comments>
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
          <p>Vamos te direcionar para o PagSeguro e logo que a transação for confirmada o conteúdo fica liberado pra você.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn primary dark @click.native="compra_pagseguro()" :loading="loading_pagseguro">Vamos nessa</v-btn>
          <v-btn normal dark @click.native="dialog_precompra = false">Agora não</v-btn>
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
          <v-btn normal dark @click.native="dialog_precompra = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_breve" lazy absolute>
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
