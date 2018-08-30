<template>
  <div>
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
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  data () {
    return {
      course: null,
      dialog_precompra: false,
      dialog_poscompra: false,
      loading_pagseguro: false,
    }
  },
  computed: {
    ...Vuex.mapGetters({
      logged_user: 'auth/logged_user',
    }),
  },
  methods: {
    show (course) {
      this.course = course
      this.dialog_precompra = true;
    },
    compra_pagseguro (){
      if(!this.$store.state.auth.logged_user){
        this.$store.commit('toast/open', {message: 'Você precisa fazer login antes!'})
        return;
      }
      if(!this.$store.state.auth.logged_user.last_name){
          this.$store.commit('toast/open', {message: 'Antes de fazer esta compra, você precisa completar as informações do seu perfil'})
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
          this.$store.commit('toast/open', {message: 'Compra cancelada', color: 'success'})
        }
        if (!suporta_lightbox){
          throw new Error('nao suporta light box do pagseguro')
        }
      });
    }
  },
}
</script>