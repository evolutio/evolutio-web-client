export default function (ctx) {
    if(ctx.isServer){
        var loc = ctx.req.headers.host+ctx.req.url;
        console.log('set loc server = '+loc);
        ctx.store.commit('SET_LOCATION', loc)
    } else {
        var loc = window.location.host+ctx.route.fullPath;
        console.log('set loc client = '+loc);
        ctx.store.commit('SET_LOCATION', loc);
    }
}
