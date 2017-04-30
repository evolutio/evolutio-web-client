<template>
  <main>
    <div>
      Hello {{user.name}}
    </div>
  </main>
</template>

<script>

import axios from 'axios';

export default {
  asyncData (context) {

    //TODO: Esse github aqui nao tem nada a ver
    //TODO: Implementar autenticacao direito. Investigar o middleware do nuxt.

    return axios.get('https://api.github.com/users/tonylampada').then((response) => {
        return {user: response.data}
    });
  },
  data () {
    return {
      user: null,
    };
  },
}
</script>
