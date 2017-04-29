<template>
  <div>
    Hello {{user.name}}
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'GithubProfile',
  asyncData (context) {
    console.log('asyncData!')
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