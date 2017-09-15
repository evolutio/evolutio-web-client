<template>
  <main>
    <input type="text" v-model="code">
    <button @click="vai()">AAAAAAA</button>
  </main>
</template>

<script>
export default {
  data () {
    return {
      code: '',
    }
  },
  methods: {
    vai(){
      var isOpenLightbox = PagSeguroLightbox({
          code: this.code
      }, {
          success : function(transactionCode) {
              alert("success - " + transactionCode);
          },
          abort : function() {
              alert("abort");
          }
      });
      // Redirecionando o cliente caso o navegador não tenha suporte ao Lightbox
      if (!isOpenLightbox){
          window.location.href="https://pagseguro.uol.com.br/v2/checkout/payment.html?code="+code;
      }
    }
  }
}
</script>

