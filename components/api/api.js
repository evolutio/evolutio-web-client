import axios from '~/plugins/axios';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default {
    login: login,
    logout: logout,
    whoami: whoami,
    list_courses: list_courses,
    get_course: get_course,
};

function login(username, password){
    return post('/api/login', {username: username, password: password});
}

function logout(){
    return post('/api/logout');
}

function whoami(){
    return get('/api/whoami');
}

function list_courses(){
    return get('/api/list_courses');
}

function get_course(code){
    return get('/api/get_course', {code: code});
}

function get(url, params){
    return axios.get(url, {params: params});
}

function post(url, params){
    var fd = new FormData();
    params = params || {}
    Object.keys(params).map((k) => {
        fd.append(k, params[k]);
    })
    return axios.post(url, fd);
}