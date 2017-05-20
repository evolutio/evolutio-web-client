import axios from '~/plugins/axios';

export default function (ctx) {
    if(ctx.isServer){
        Object.keys(ctx.req.headers).map((key)=>{
            axios.defaults.headers.common[key] = ctx.req.headers[key];
        });
    }
}
