import AppApi from '~apijs'

export default function (ctx) {
    if(ctx.store.state.auth.logged_user === undefined){
        return AppApi.whoami().then((response) => {
            if(response.data.authenticated){
                ctx.store.commit('auth/SET_LOGGED_USER', response.data.user);
            } else {
                ctx.store.commit('auth/SET_LOGGED_USER', null);
            }
        });
    }
}