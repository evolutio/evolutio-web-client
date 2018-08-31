<template>
  <div>
    <v-list two-line>
      <template v-for="(content, index) in course.contents">
        <v-divider v-if="index > 0" :key="index" />
        <v-list-tile :key="content.id" @click="open_content(content, $event)">
          <v-list-tile-avatar>
            <v-icon :color="content_icon(content).color">{{content_icon(content).icon}}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title
              class="fw-bold"
              :class="content.kind === 'RESTRICTED' ? 'text-inactive' : 'text-primary'"
            >
              {{ content.name }}
            </v-list-tile-title>
            <v-list-tile-sub-title v-if="content.duration">{{ content.duration | time }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="content.kind === 'RESTRICTED'">
            <v-btn icon ripple>
              <v-icon color="orange lighten-1">star</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
    <v-dialog v-model="dialog_breve" lazy absolute max-width="500px">
      <v-card class="pa-4">
        <v-card-title>
          <div class="headline fw-bold">Em breve!</div>
        </v-card-title>
        <v-card-text>
          <p class="fs-sm">Esse conteúdo ainda não está disponível.</p>
          <p class="fs-sm">Faça login pra receber nossas atualizações de conteúdo.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click.native="dialog_breve = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <VideoDialog :course="course" ref="video_dialog"></VideoDialog>
  </div>
</template>

<script>
import VideoDialog from '~/components/VideoDialog'

export default {
  components: {
    VideoDialog
  },
  props: ['course'],
  data () {
    return {
      active: 'material',
      dialog_breve: false
    };
  },
  methods: {
    content_icon (content) {
      if (content.kind in {youtube: 1, vimeo: 1}) {
        return { color: 'red', icon: 'ondemand_video' }
      }
      if (content.kind === 'RESTRICTED') {
        return { color: 'grey', icon: 'https' }
      }
      if (content.kind === 'SOON') {
        return { color: 'blue', icon: 'cast' }
      }
      return { color: 'grey', icon: 'note' }
    },
    open_content (content, evt){
      if (content.kind == 'RESTRICTED'){
        this.$emit('iniciarCompra', evt);
      } else if (content.kind == 'SOON'){
        this.dialog_breve = true;
      } else {
        this.$refs.video_dialog.open(content)
      }
      evt.stopPropagation();
    }
  }
}

</script>