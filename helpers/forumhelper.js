export default {
  gocomment (ctx, evt) {
    if (ctx.logged_user) {
      ctx.$refs.commentdialog.open({
        title: 'Adicione um comentário',
        label: 'Comentário',
        value: '',
        action: 'Enviar',
        actionFunc: value => {
          return AppApi.send_comment(ctx.forum.id, null, value).then(response => {
            const newcomment = {...response.data, replies: []};
            ctx.forum.comments.push(newcomment);
            setTimeout(()=>{
              ctx.$refs.end.scrollIntoView()
            }, 1)
          })
        }
      })
      if (evt) {
        evt.stopPropagation()
      }
    } else {
      Toasts.show('Faça login para comentar', {timeout: 3000});
    }
  },
  goreply (ctx, comment, evt) {
    if (ctx.logged_user) {
      ctx.$refs.commentdialog.open({
        title: 'Responder',
        label: 'Resposta',
        value: '',
        action: 'Enviar',
        actionFunc: value => {
          return AppApi.send_comment(ctx.forum.id, comment.id, value).then(response => {
            comment.replies.push(response.data)
            setTimeout(()=>{
              ctx.$refs['end_'+comment.id][0].scrollIntoView()
            }, 1)
          })
        }
      })
      if (evt) {
        evt.stopPropagation()
      }
    } else {
      Toasts.show('Faça login para responder', {timeout: 3000});
    }
  },
  goedit (ctx, comment, evt) {
    ctx.$refs.commentdialog.open({
      title: 'Editar resposta',
      label: 'Resposta',
      value: comment.text,
      action: 'Enviar',
      actionFunc: value => {
        return AppApi.edit_comment(comment.id, value).then(response => {
          comment.text = response.data.text
        })
      }
    })
    if (evt) {
      evt.stopPropagation()
    }
  },
  toggle_follow (ctx, ) {
    if (ctx.logged_user) {
      AppApi.follow_course_by_email(ctx.forum.id, ctx.forum.notify_email).then(() => {
        if(ctx.forum.notify_email){
          Toasts.show('Você vai receber emails sempre que alguém adicionar um comentário', {timeout: 3000});
        } else {
          Toasts.show('Você não vai mais receber emails com comentários nesta conversa', {timeout: 3000});
        }
      })
    } else {
      Toasts.show('Você precisa fazer login primeiro!', {timeout: 3000});
      ctx.forum.notify_email = false
    }
  }
}