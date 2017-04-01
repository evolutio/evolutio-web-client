import AppApi from 'apijs'

export default {
    init,
    current_user,
};

function init(){
    AppApi.whoami().then(); //...
}

function current_user(){
    return null;
};
