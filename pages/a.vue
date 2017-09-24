<template>
  <main>
    <button @click="vai()">AAAAAAA</button>
  </main>
</template>

<script>

import AppApi from '~apijs'

export default {
  data () {
    return {
    }
  },
  methods: {
    vai(){
      AppApi.get_paycode('wttd').then((response) => {
        var code = response.data.checkout.code;
        var suporta_lightbox = PagSeguroLightbox({code: code}, {success : onsuccess, abort : onabort});

        function onsuccess(transactionCode) {
          alert("success - " + transactionCode);
        }
        function onabort(){
          alert('abort');
        }
        // Redirecionando o cliente caso o navegador não tenha suporte ao Lightbox
        if (!suporta_lightbox){
            window.location.href="https://pagseguro.uol.com.br/v2/checkout/payment.html?code="+code;
        }

      });

    }
  }
}
</script>

