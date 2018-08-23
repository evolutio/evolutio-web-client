import Vue from 'vue'

var logged_user = null;
var _COURSEDB = _coursedb();
var _ID = 0

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
    send_comment: _mockasync(send_comment),
    edit_comment: _mockasync(edit_comment),
    follow_course_by_email: _mockasync(follow_course_by_email),
};

function list_courses(){
    return Vue.util.extend({}, _COURSEDB)
}

function get_course(code){
    const course = Vue.util.extend({}, _COURSEDB.filter((course) => (course.code == code))[0]);
    course.comments = comments;
    return course;
}

function _coursedb(){
    var A_MD_DESCRIPTION = "This is a fork of [webpack-simple](https://github.com/vuejs-templates/webpack-simple) template, with a few additions of my own.\n\nIn particular, there are two things here that you might want to check out, I think those are pretty cool and really improve the development process for web applications:\n\n* The [use of mock-apis](https://medium.com/@tonylampada/javascript-mock-api-why-you-might-want-to-have-one-232b3ba46b12#.wjbs02z48)\n* The [Component Catalog](https://medium.com/@tonylampada/component-catalog-why-you-might-want-to-have-one-72ee1dc1f6b1#.zgd3w9lhx) (See a [live demo](https://tonylampada.github.io/tlvuestarter/docs.html#/view/TodoDocs))\n\nContrary of what `webpack-simple` says, I *do* encourage you to use this template for production projects.\n\n### Usage\n\nThis is a project template for [vue-cli](https://github.com/vuejs/vue-cli).\n\n``` bash\n$ npm install -g vue-cli\n$ vue init tonylampada/tlvuestarter my-project\n$ cd my-project\n$ npm install\n$ npm run dev\n```\n\n### What's Included\n\n\n- Styling with [Bulma CSS framework](http://bulma.io)\n- [Font Awesome](http://fontawesome.io) icons\n- Simple AJAX with [axios](https://www.npmjs.com/package/axios)\n- `npm run dev`: Webpack + `vue-loader` with proper config for source maps & hot-reload (See a [live demo](https://tonylampada.github.io/tlvuestarter/)).\n- `npm run build`: build with HTML/CSS/JS minification.\n- Backendless environment with [Mock APIs](#mock-apis)\n- Basic mocked authentication that is easy to plug in your backend\n- `npm run unit`: Run unit tests, *with coverage reports* inside `/coverage`.\n- A [Component Catalog](#component-catalog)\n\n### Mock APIs\n\n* [api.js](https://github.com/tonylampada/tlvuestarter/blob/master/template/src/api/api.js) - your real backend calls go here (in this case we are actually consuming endpoints from Github's api, so... replace with what makes sense for your backend).\n* [apimock.js](https://github.com/tonylampada/tlvuestarter/blob/master/template/src/api/apimock.js) - fake api. Have all the same methods on `api.js` but returns hardcoded-ish data build with plain javascript.\n\nWhen you fire the development environment with `npm run dev`, the fake api from `apimock.js` will be used, but when you build the production version with `npm run build`, the real api from `api.js` will be used instead (this is implemented using environment variables in `webpack-config.js`)\n\n[Why would I want to have that?](https://medium.com/@tonylampada/javascript-mock-api-why-you-might-want-to-have-one-232b3ba46b12#.wjbs02z48)\n\n### Component Catalog\n\nThere are two SPAs here: `index.html` which is supposed to be your main front-end application, and `docs.html` which is the [Component Catalog](https://medium.com/@tonylampada/component-catalog-why-you-might-want-to-have-one-72ee1dc1f6b1#.zgd3w9lhx).\n\nAny vue component that you create like `src/**/docs/*Docs.vue` will be automatically discovered and added to the docs app."
    return [
        {
            code: 'ng-masters',
            name: 'ng-masters - AngularJS na prática',
            teachers: 'Tony Lâmpada',
            teacher_avatar: 'https://graph.facebook.com/4/picture?width=300&height=300',
            description: 'Este curso vai mostrar ao aluno através de exemplos práticos que é possível criar aplicações complexas usando código simples e modularizado.',
            icon: '/images/angular.jpg',
            banner: '/images/angular_banner.png',
            thumbnail: '/images/angular_banner.png',
            price: 29.90,
            old_price: 159.90,
            owned: false,
            notify_email: false,
            contents: [
                { kind: 'youtube', ref: '-gL0Hbk74i4', name: '001 - Apresentação - o que vamos aprender neste curso', md: A_MD_DESCRIPTION, duration: 3601.92},
                { kind: 'youtube', ref: 'CqUkoLKQ0dY', name: '002 - npm, nvm, nodejs e vue-cli', duration: 39},
                { kind: 'youtube', ref: 'iPtSNdriyM4', name: '003 - Apresentando o D-jà vue - template de projeto Django + Vue', duration: 287},
                { kind: 'youtube', ref: 'dp_k331UwPg', name: '004 - Exercício: Screenshot do seu projeto djavue rodando', duration: 415},
                { kind: 'vimeo', ref: '235220559', name: '005 - Como vai ser o ambiente de produção', duration: 817},
                { kind: 'RESTRICTED', name: '006 - Deploy do Jabuticaba em produção na AWS', duration: 176},
                { kind: 'RESTRICTED', name: '007 - NUXT - Roteamento simples', duration: 981},
                { kind: 'SOON', name: '008 - Vuetify: Recheando nossa timeline com alguns tweets', duration: 8765},
            ],
        },
        {
            code: 'css-agora-vai',
            name: 'CSS - agora vai!',
            teachers: 'Luiz Otávio',
            teacher_avatar: 'https://graph.facebook.com/5/picture?width=300&height=300',
            description: 'Supere a barreira inicial do CSS criando layouts bonitos, funcionais e responsivos.',
            icon: '/images/css.png',
            banner: '/images/css_banner.jpg',
            thumbnail: '/images/css_banner.jpg',
            notify_email: false,
            price: 0,
            old_price: 20,
            contents: [
                { kind: 'youtube', ref: '-gL0Hbk74i4', name: 'Step 1', duration: 2000},
                { kind: 'youtube', ref: 'CqUkoLKQ0dY', name: 'Steps 2 e 3', duration: 2000},
                { kind: 'youtube', ref: 'iPtSNdriyM4', name: 'Step 4', duration: 2000},
                { kind: 'youtube', ref: 'dp_k331UwPg', name: 'Step 5', duration: 2000},
                { kind: 'youtube', ref: '6JmbY7fhBpA', name: 'Step 6', duration: 2000},
                { kind: 'youtube', ref: 'wLrjdwhww0E', name: 'Step 7', duration: 2000},
                { kind: 'youtube', ref: 'QnbsV5CJKrY', name: 'Step 8', duration: 2000},
            ],
        },
        {
            code: 'python-para-zumbis',
            name: 'Python para Zumbis',
            teachers: 'Prof. Masanori',
            teacher_avatar: 'https://graph.facebook.com/6/picture?width=300&height=300',
            description: 'Descubra o poder da programação mergulhando no mundo desta linguagem simples e poderosa.',
            icon: '/images/python.png',
            banner: '/images/python_banner.jpg',
            thumbnail: '/images/python_banner.jpg',
            notify_email: false,
            price: 0,
            old_price: 140,
            contents: [
                { kind: 'youtube', ref: '-gL0Hbk74i4', name: 'Step 1', duration: 3100},
                { kind: 'youtube', ref: 'CqUkoLKQ0dY', name: 'Steps 2 e 3', duration: 3100},
                { kind: 'youtube', ref: 'iPtSNdriyM4', name: 'Step 4', duration: 3100},
                { kind: 'youtube', ref: 'dp_k331UwPg', name: 'Step 5', duration: 3100},
                { kind: 'youtube', ref: '6JmbY7fhBpA', name: 'Step 6', duration: 3100},
                { kind: 'youtube', ref: 'wLrjdwhww0E', name: 'Step 7', duration: 3100},
                { kind: 'youtube', ref: 'QnbsV5CJKrY', name: 'Step 8', duration: 3100},
            ],
        },
        {
            code: 'djavue',
            name: 'd-já vue: uma jornada pelo desenvolvimento web njsakjansdj Django e Vue nome do curso gigante demais pra ser verdade',
            teachers: 'Tony Lâmpada',
            teacher_avatar: 'https://graph.facebook.com/4/picture?width=300&height=300',
            description: 'Como construir aplicações web com agilidade e qualidade. Um mergullho incial no mundo da programação, usando python com a mão na massa já no primeiro minuto!',
            icon: '/images/angular.jpg',
            banner: '/images/angular_banner.png',
            thumbnail: '/images/angular_banner.png',
            price: 69.90,
            old_price: 1289.90,
            owned: false,
            notify_email: false,
            contents: [
                { kind: 'youtube', ref: '-gL0Hbk74i4', name: 'Step 1', md: A_MD_DESCRIPTION, duration: 200},
                { kind: 'youtube', ref: 'CqUkoLKQ0dY', name: 'Steps 2 e 3', duration: 200},
                { kind: 'youtube', ref: 'iPtSNdriyM4', name: 'Step 4', duration: 200},
                { kind: 'youtube', ref: 'dp_k331UwPg', name: 'Step 5', duration: 200},
                { kind: 'vimeo', ref: '235220559', name: 'Step 6', duration: 200},
                { kind: 'RESTRICTED', name: 'Step 7', duration: 200},
                { kind: 'RESTRICTED', name: 'Step 8', duration: 200},
                { kind: 'SOON', name: 'Step 9', duration: 200},
            ],
        },
        {
            code: 'css-agora-vai-2',
            name: 'Programação - Sente só como é!',
            teachers: 'Luiz Otávio',
            teacher_avatar: 'https://graph.facebook.com/5/picture?width=300&height=300',
            description: 'Um mergullho incial no mundo da programação, usando python com a mão na massa já no primeiro minuto!',
            icon: '/images/css.png',
            banner: '/images/css_banner.jpg',
            thumbnail: '/images/css_banner.jpg',
            notify_email: false,
            price: 0,
            old_price: 0,
            contents: [
                { kind: 'youtube', ref: '-gL0Hbk74i4', name: 'Step 1', duration: 2000},
                { kind: 'youtube', ref: 'CqUkoLKQ0dY', name: 'Steps 2 e 3', duration: 2000},
                { kind: 'youtube', ref: 'iPtSNdriyM4', name: 'Step 4', duration: 2000},
                { kind: 'youtube', ref: 'dp_k331UwPg', name: 'Step 5', duration: 2000},
                { kind: 'youtube', ref: '6JmbY7fhBpA', name: 'Step 6', duration: 2000},
                { kind: 'youtube', ref: 'wLrjdwhww0E', name: 'Step 7', duration: 2000},
                { kind: 'youtube', ref: 'QnbsV5CJKrY', name: 'Step 8', duration: 2000},
            ],
        },
        {
            code: 'python-para-zumbis-2',
            name: 'Python para Zumbis',
            teachers: 'Prof. Masanori',
            teacher_avatar: 'https://graph.facebook.com/6/picture?width=300&height=300',
            description: 'Descubra o poder da programação mergulhando no mundo desta linguagem simples e poderosa.',
            icon: '/images/python.png',
            banner: '/images/python_banner.jpg',
            thumbnail: '/images/python_banner.jpg',
            notify_email: false,
            price: 0,
            old_price: 0,
            contents: [
                { kind: 'youtube', ref: '-gL0Hbk74i4', name: 'Step 1', duration: 3100},
                { kind: 'youtube', ref: 'CqUkoLKQ0dY', name: 'Steps 2 e 3', duration: 3100},
                { kind: 'youtube', ref: 'iPtSNdriyM4', name: 'Step 4', duration: 3100},
                { kind: 'youtube', ref: 'dp_k331UwPg', name: 'Step 5', duration: 3100},
                { kind: 'youtube', ref: '6JmbY7fhBpA', name: 'Step 6', duration: 3100},
                { kind: 'youtube', ref: 'wLrjdwhww0E', name: 'Step 7', duration: 3100},
                { kind: 'youtube', ref: 'QnbsV5CJKrY', name: 'Step 8', duration: 3100},
            ],
        },
    ];
}

function login(username, password){
    if(password){
        logged_user = {
            id: 1,
            username: username,
            first_name: 'João',
            last_name: 'Silva',
            email: 'my@email.com',
            notifications_enabled: true,
            img: fotogates,
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

function send_comment(forum_id, parent_id, text){
    return {
        id: ++_ID,
        author: logged_user.first_name,
        author_img: logged_user.img,
        created_at: '2018-03-26T19:40:46.480877',
        text: text,
    }
}

function edit_comment(comment_id, text){
    return {
        id: comment_id, 
        text: text,
    }
}

function follow_course_by_email(course_code, follow){
    return {}
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

const fotozuck = 'https://graph.facebook.com/4/picture?width=300&height=300';
const fotogates = 'https://graph.facebook.com/216311481960/picture?width=300&height=300';
const comm = 'Ao contrário da crença popular, Lipsum (Lorem Ipsum abreviado) não é simplesmente um texto qualquer com um monte de letras. Ela tem raízes numa peça clássica da literatura latina de 45 A.C., fazendo com que este famoso texto tenha mais de 2000 anos de idade.\n\n Richard McClintock, um professor de Latim na Hampden-Sydney College na Virginia, pesquisou uma das mais obscuras palavras em Latim, "consectetur", da passagem de Lipsum, e indo a fundo nas citações da literatura clássica descobriu de uma fonte segura que Lipsum vem das seções 1.10.32 e 1.10.33 do "de Finibus Bonorum et Malorum" (Os Extremos do Bem e do Mal) escrito por Cícero em 45 A.C.. Este livro trata da teoria de ética, muito popular durante a Renascença. A primeira linha de Lipsum, "Lorem ipsum dolor sit amet...", pode ser lida na seção 1.10.32.[1]';
const rep = 'Ela tem raízes numa peça clássica da literatura latina de 45 A.C., fazendo com que este famoso texto tenha mais de 2000 anos de idade.\n\n Richard McClintock, um professor de Latim na Hampden-Sydney College na Virginia, pesquisou uma das mais obscuras palavras em Latim, "consectetur", da passagem de Lipsum, e indo a fundo nas citações da literatura clássica descobriu de uma fonte segura que Lipsum vem das seções 1.10.32 e 1.10.33 do "de Finibus Bonorum et Malorum" (Os Extremos do Bem e do Mal) escrito por Cícero em 45 A.C.. Este livro trata da teoria de ética, muito popular durante a Renascença. A primeira linha de Lipsum, "Lorem ipsum dolor sit amet...", pode ser lida na seção 1.10.32.[1]';
const commentZuck = {
  author_id: 1,
  author: 'Mark Zuckerberg',
  author_img: fotozuck,
  created_at: '2018-08-22T19:40:46.480877',
  text: comm,
}
const commentGates = {
  author_id: 2,
  author: 'Bill Gates',
  author_img: fotogates,
  created_at: '2017-02-02T19:40:46.480877',
  text: rep,
}

const comments = [
    {
        ...commentZuck, 
        id: ++_ID,
        replies: [{...commentGates, id: ++_ID}, {...commentZuck, id: ++_ID}]
    },
    {...commentGates, id: ++_ID},
]