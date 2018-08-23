export default {
  gocomment (evt) {
    if (this.logged_user) {
      this.$refs.commentdialog.open({
        title: 'Adicione um comentário',
        label: 'Comentário',
        value: '',
        action: 'Enviar',
        actionFunc: value => {
          return AppApi.send_comment(this.forum.id, null, value).then(response => {
            const newcomment = {...response.data, replies: []};
            this.forum.comments.push(newcomment);
            setTimeout(()=>{
              this.$refs.end.scrollIntoView()
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
  goreply (comment, evt) {
    if (this.logged_user) {
      this.$refs.commentdialog.open({
        title: 'Responder',
        label: 'Resposta',
        value: '',
        action: 'Enviar',
        actionFunc: value => {
          return AppApi.send_comment(this.forum.id, comment.id, value).then(response => {
            comment.replies.push(response.data)
            setTimeout(()=>{
              this.$refs['end_'+comment.id][0].scrollIntoView()
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
  goedit (comment, evt) {
    this.$refs.commentdialog.open({
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
  toggle_follow () {
    if (this.logged_user) {
      AppApi.follow_course_by_email(this.forum.id, this.forum.notify_email).then(() => {
        if(this.forum.notify_email){
          Toasts.show('Você vai receber emails sempre que alguém adicionar um comentário', {timeout: 3000});
        } else {
          Toasts.show('Você não vai mais receber emails com comentários nesta conversa', {timeout: 3000});
        }
      })
    } else {
      Toasts.show('Você precisa fazer login primeiro!', {timeout: 3000});
      this.forum.notify_email = false
    }
  }
}