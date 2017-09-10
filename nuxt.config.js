
const { join } = require('path')

function _apijs(context){
  var mock = context.dev;
  if('API_MOCK' in process.env){
    mock = process.env.API_MOCK == '1';
  }
  return mock ? 'apimock.js' : 'api.js';
}

module.exports = {
  build: {
    vendor: ['vuetify'],
    extend (config, context){
      home = config.resolve.alias['~'];
      config.resolve.alias['~apijs'] = home + '/components/api/' + _apijs(context);
    }
  },
  router: {
    middleware: ['fwdcookies', 'auth'],
  },
  plugins: [
    '~plugins/vuetify.js', 
    {src: '~plugins/fb-sdk.js', ssr: false},
    {src: '~plugins/ga.js', ssr: false },
    {src: '~plugins/sentry.js', ssr: false }
  ],
  css: [
    { src: join(__dirname, 'css/app.styl'), lang: 'styl' },
    'assets/main.css'
  ],
  head: {
    script: [
      // {src: 'https://cdn.jsdelivr.net/vue/2.0.0-rc/vue.min.js'},
      {src: 'https://cdn.ravenjs.com/3.17.0/vue/raven.min.js', crossorigin: 'anonymous'},
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Meta description' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ]
  },
  env: {
    PIPOCA: process.env.PATH,
  }
}
