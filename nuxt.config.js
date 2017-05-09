
const { join } = require('path')

module.exports = {
  build: {
    vendor: ['vuetify'],
    extend (config, context){
      home = config.resolve.alias['~']
      config.resolve.alias['~apijs'] = home + '/components/api/' + (context.dev ? 'apimock.js' : 'api.js');
    }
  },
  router: {
    middleware: 'auth',
  },
  plugins: ['~plugins/vuetify.js'],
  css: [
    { src: join(__dirname, 'css/app.styl'), lang: 'styl' },
    'assets/main.css'
  ],
  head: {
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ]
  }
}
