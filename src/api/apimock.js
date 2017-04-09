import Vue from 'vue'

var logged_user = null;
var _COURSEDB = _coursedb();

export default {
    list_repos: _mockasync(list_repos),
    list_issues: _mockasync(list_issues),
    list_courses: _mockasync(list_courses),
    get_course: _mockasync(get_course),
    login: _mockasync(login),
    whoami: _mockasync(whoami),
};

function list_courses(){
    return Vue.util.extend({}, _COURSEDB)
}

function get_course(code){
    return Vue.util.extend({}, _COURSEDB.filter((course) => (course.code == code))[0]);
}

function _coursedb(){
    return [
        {
            code: 'ng-masters',
            name: 'ng-masters - AngularJS na prática',
            teachers: 'Tony Lâmpada',
            description: 'Este curso vai mostrar ao aluno através de exemplos práticos que é possível criar aplicações complexas usando código simples e modularizado.',
        },
        {
            code: 'css-agora-vai',
            name: 'CSS - agora vai!',
            teachers: 'Luiz Otávio',
            description: 'Supere a barreira inicial do CSS criando layouts bonitos, funcionais e responsivos.',
        },
        {
            code: 'python-para-zumbis',
            name: 'Python para Zumbis',
            teachers: 'Prof. Masanori',
            description: 'Descubra o poder da programação mergulhando no mundo desta linguagem simples e poderosa.',
        },
    ];
}

function list_repos(u){
    return [
        {
            name: 'angularjs',
            owner: {login: 'ze'},
        }, 
        {
            name: 'vuejs',
            owner: {login: 'ze'},
        },
        {
            name: 'react',
            owner: {login: 'ze'},
        }
    ];
}

function list_issues(u, r){
    return [
        {
            number: 313,
            title: 'Construir a maquina do tempo',
        },
        {
            number: 312,
            title: 'Voltar no passado e impedir a 2a guerra mundial',
        },
    ];
};

function login(username, password){
    if(password){
        logged_user = {
            username: username,
            name: username,
            permissions:{
                ADMIN: false,
                STAFF: false,
            }
        };
    }
    return logged_user;
}

function whoami(){
    return logged_user ? {
        authenticated: true,
        user: logged_user,
    } : {authenticated: false};
}

function _mockasync(f){
    function mocked(){
        var res = f.apply(this, arguments);
        return new Promise(function(resolve, reject){
            window.setTimeout(function(){
                resolve({data: res});
            }, 600);
        });
    }
    return mocked;
}
