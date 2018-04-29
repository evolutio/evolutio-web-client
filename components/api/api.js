import axios from '~/plugins/axios';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default {
    login,
    logout,
    whoami,
    list_courses,
    get_course,
    save_perfil,
    admin_send_mail,
    get_paycode,
    save_content,
    send_comment,
    follow_course_by_email,
};

function login(username, password){
    return post('/api/login', {username: username, password: password});
}

function social_login(provider){
    var url = {
        'google': '/login/google-oauth2',
        'facebook': '/login/facebook',
        'github': '/login/github',
    }[provider]
    if(url){
        window.location = url
    }
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

function save_perfil(user){
    return post('/api/save_perfil', {user: JSON.stringify(user)});
}

function admin_send_mail(to, subject, body){
    return post('/api/admin_send_mail', {to: to, subject: subject, body: body});
}

function get_paycode(course_code){
    return get('/api/get_paycode', {course_code: course_code});
}

function send_comment(forum_id, parent_id, text){
    const data = {forum_id, text};
    if(parent_id){
        data.parent_id = parent_id;
    }
    return post('/api/send_comment', data);
}

function follow_course_by_email(course_id, follow){
    return post('/api/follow_course_by_email', {course_id, follow});
}

function save_content(course_code, content){
    const _content = {
        kind: content.kind,
        ref: content.ref,
        name: content.name,
        md: content.md,
    };
    return post('/api/save_content', {course_code: course_code, content: JSON.stringify(_content)});
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