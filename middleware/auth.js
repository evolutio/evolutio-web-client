export default function (ctx) {
    var r = Math.random();
    console.log('middleware '+r);
    ctx.store.commit('SET_R', r);
}