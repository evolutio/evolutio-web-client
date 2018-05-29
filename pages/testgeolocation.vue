<template>
  <main>
    <h3>Sua localização</h3>
    <pre>{{position}}</pre>
    <ul>
      <li><a href="https://github.com/evolutio/evolutio-web-client/blob/master/pages/testgeolocation.vue">Código</a></li>
      <li><a href="https://www.w3schools.com/Html/html5_geolocation.asp">Documentação da API</a></li>
    </ul>
  </main>
</template>

<script>

export default {
  data () {
    return {
      position: null,
    }
  },
  mounted () {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        this.position = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
          timestamp: position.timestamp
        }
      })
    } else {
      this.position = {
        error: 'A API de geolocation não é suportada neste navegador / dispositivo'
      }
    }
  }
}
</script>
