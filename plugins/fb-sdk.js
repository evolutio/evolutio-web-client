const vue_fb = {}
vue_fb.install = function install(Vue, options) {
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) {return}
        js = d.createElement(s)
        js.id = id
        js.src = "//connect.facebook.net/en_US/sdk.js"
        fjs.parentNode.insertBefore(js, fjs)
        console.log('setting fb sdk')
    }(document, 'script', 'facebook-jssdk'))

    window.fbAsyncInit = function onSDKInit() {
        // FB.init(options)
        // FB.AppEvents.logPageView()
        Vue.FB = FB
        Vue.FB.OPTIONS = options;
        window.dispatchEvent(new Event('fb-sdk-ready'))
    }
    Vue.FB = undefined
}

import Vue from 'vue'

Vue.use(vue_fb, {
    appId: '828876573927451',
    autoLogAppEvents: true,
    status: true,
    cookie: true,
    xfbml:  true,
    oauth: true,
    version: 'v2.10',
})