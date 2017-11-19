import Vue from 'vue'

var logged_user = null;
var _COURSEDB = _coursedb();

export default {
    login: _mockasync(login),
    logout: _mockasync(logout),
    whoami: _mockasync(whoami),
    list_courses: _mockasync(list_courses),
    get_course: _mockasync(get_course),
    save_perfil: _mockasync(save_perfil),
    admin_send_mail: _mockasync(admin_send_mail),
    get_paycode: _mockasync(get_paycode),
    save_content: _mockasync(save_content),
};

function list_courses(){
    return Vue.util.extend({}, _COURSEDB)
}

function get_course(code){
    return Vue.util.extend({}, _COURSEDB.filter((course) => (course.code == code))[0]);
}

function _coursedb(){
    var A_MD_DESCRIPTION = "This is a fork of [webpack-simple](https://github.com/vuejs-templates/webpack-simple) template, with a few additions of my own.\n\nIn particular, there are two things here that you might want to check out, I think those are pretty cool and really improve the development process for web applications:\n\n* The [use of mock-apis](https://medium.com/@tonylampada/javascript-mock-api-why-you-might-want-to-have-one-232b3ba46b12#.wjbs02z48)\n* The [Component Catalog](https://medium.com/@tonylampada/component-catalog-why-you-might-want-to-have-one-72ee1dc1f6b1#.zgd3w9lhx) (See a [live demo](https://tonylampada.github.io/tlvuestarter/docs.html#/view/TodoDocs))\n\nContrary of what `webpack-simple` says, I *do* encourage you to use this template for production projects.\n\n### Usage\n\nThis is a project template for [vue-cli](https://github.com/vuejs/vue-cli).\n\n``` bash\n$ npm install -g vue-cli\n$ vue init tonylampada/tlvuestarter my-project\n$ cd my-project\n$ npm install\n$ npm run dev\n```\n\n### What's Included\n\n\n- Styling with [Bulma CSS framework](http://bulma.io)\n- [Font Awesome](http://fontawesome.io) icons\n- Simple AJAX with [axios](https://www.npmjs.com/package/axios)\n- `npm run dev`: Webpack + `vue-loader` with proper config for source maps & hot-reload (See a [live demo](https://tonylampada.github.io/tlvuestarter/)).\n- `npm run build`: build with HTML/CSS/JS minification.\n- Backendless environment with [Mock APIs](#mock-apis)\n- Basic mocked authentication that is easy to plug in your backend\n- `npm run unit`: Run unit tests, *with coverage reports* inside `/coverage`.\n- A [Component Catalog](#component-catalog)\n\n### Mock APIs\n\n* [api.js](https://github.com/tonylampada/tlvuestarter/blob/master/template/src/api/api.js) - your real backend calls go here (in this case we are actually consuming endpoints from Github's api, so... replace with what makes sense for your backend).\n* [apimock.js](https://github.com/tonylampada/tlvuestarter/blob/master/template/src/api/apimock.js) - fake api. Have all the same methods on `api.js` but returns hardcoded-ish data build with plain javascript.\n\nWhen you fire the development environment with `npm run dev`, the fake api from `apimock.js` will be used, but when you build the production version with `npm run build`, the real api from `api.js` will be used instead (this is implemented using environment variables in `webpack-config.js`)\n\n[Why would I want to have that?](https://medium.com/@tonylampada/javascript-mock-api-why-you-might-want-to-have-one-232b3ba46b12#.wjbs02z48)\n\n### Component Catalog\n\nThere are two SPAs here: `index.html` which is supposed to be your main front-end application, and `docs.html` which is the [Component Catalog](https://medium.com/@tonylampada/component-catalog-why-you-might-want-to-have-one-72ee1dc1f6b1#.zgd3w9lhx).\n\nAny vue component that you create like `src/**/docs/*Docs.vue` will be automatically discovered and added to the docs app."
    return [
        {
            code: 'ng-masters',
            name: 'ng-masters - AngularJS na prática',
            teachers: 'Tony Lâmpada',
            description: 'Este curso vai mostrar ao aluno através de exemplos práticos que é possível criar aplicações complexas usando código simples e modularizado.',
            icon: '/images/angular.jpg',
            banner: '/images/angular_banner.png',
            price: 29.90,
            owned: false,
            contents: [
                { kind: 'youtube', ref: '-gL0Hbk74i4', name: 'Step 1', md: A_MD_DESCRIPTION},
                { kind: 'youtube', ref: 'CqUkoLKQ0dY', name: 'Steps 2 e 3'},
                { kind: 'youtube', ref: 'iPtSNdriyM4', name: 'Step 4'},
                { kind: 'youtube', ref: 'dp_k331UwPg', name: 'Step 5'},
                { kind: 'vimeo', ref: '235220559', name: 'Step 6'},
                { kind: 'RESTRICTED', name: 'Step 7'},
                { kind: 'RESTRICTED', name: 'Step 8'},
                { kind: 'SOON', name: 'Step 9'},
            ],
        },
        {
            code: 'css-agora-vai',
            name: 'CSS - agora vai!',
            teachers: 'Luiz Otávio',
            description: 'Supere a barreira inicial do CSS criando layouts bonitos, funcionais e responsivos.',
            icon: '/images/css.png',
            banner: '/images/css_banner.jpg',
            contents: [
                { kind: 'youtube', ref: '-gL0Hbk74i4', name: 'Step 1'},
                { kind: 'youtube', ref: 'CqUkoLKQ0dY', name: 'Steps 2 e 3'},
                { kind: 'youtube', ref: 'iPtSNdriyM4', name: 'Step 4'},
                { kind: 'youtube', ref: 'dp_k331UwPg', name: 'Step 5'},
                { kind: 'youtube', ref: '6JmbY7fhBpA', name: 'Step 6'},
                { kind: 'youtube', ref: 'wLrjdwhww0E', name: 'Step 7'},
                { kind: 'youtube', ref: 'QnbsV5CJKrY', name: 'Step 8'},
            ],
        },
        {
            code: 'python-para-zumbis',
            name: 'Python para Zumbis',
            teachers: 'Prof. Masanori',
            description: 'Descubra o poder da programação mergulhando no mundo desta linguagem simples e poderosa.',
            icon: '/images/python.png',
            banner: '/images/python_banner.jpg',
            contents: [
                { kind: 'youtube', ref: '-gL0Hbk74i4', name: 'Step 1'},
                { kind: 'youtube', ref: 'CqUkoLKQ0dY', name: 'Steps 2 e 3'},
                { kind: 'youtube', ref: 'iPtSNdriyM4', name: 'Step 4'},
                { kind: 'youtube', ref: 'dp_k331UwPg', name: 'Step 5'},
                { kind: 'youtube', ref: '6JmbY7fhBpA', name: 'Step 6'},
                { kind: 'youtube', ref: 'wLrjdwhww0E', name: 'Step 7'},
                { kind: 'youtube', ref: 'QnbsV5CJKrY', name: 'Step 8'},
            ],
        },
    ];
}

function login(username, password){
    if(password){
        logged_user = {
            username: username,
            first_name: 'João',
            last_name: 'Silva',
            email: 'my@email.com',
            notifications_enabled: true,
            permissions:{
                ADMIN: username == 'admin',
                STAFF: username == 'admin',
            }
        };
    }
    return logged_user;
}

function logout(){
    logged_user = null;
}


function whoami(){
    return logged_user ? {
        authenticated: true,
        user: logged_user,
    } : {authenticated: false};
}

function save_perfil(user2save){
    Object.assign(logged_user, user2save);
    return logged_user;
}

function admin_send_mail(to, subject, body){
    return {};
}

function get_paycode(course_code){
    return {
        "checkout": {
            "code": "B4B2DD9B141408CDD492CF123CB32E0A", 
            "date": "2017-09-24T09:24:37.000-03:00"
        }
    };
}

function save_content(course_code, _content){
    const content = _COURSEDB.filter((course) => (course.code == course_code))[0].contents.filter(content => content.kind == _content.kind && content.ref == _content.ref)[0];
    content.md = _content.md;
}

function _mockasync(f){
    function mocked(){
        var res = f.apply(this, arguments);
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                resolve({data: res});
            }, 600);
        });
    }
    return mocked;
}
