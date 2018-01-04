<script>
  import AppApi from '~apijs'
  import VueMarkdown from 'vue-markdown'
  import PermissionsHelper from '~/components/PermissionsHelper.js'
  export default {
    props: ['course'],
    data () {
      return {
        visible: false,
        content: null,
        editing: false,
        saving: false,
        md_temp: '',
        tab_active: 'descricao'
      };
    },
    computed: {
      iframe_src(){
        if(this.content.kind == 'youtube'){
          return 'https://www.youtube.com/embed/'+this.content.ref+'?autoplay=1';
        } else if(this.content.kind == 'vimeo'){
          return 'https://player.vimeo.com/video/'+this.content.ref;
        }
      },
      sizes(){
        var w = Math.min(670, parseInt(.9 * this.$vuetify.breakpoint.width))
        return {
          ifrw: w - 30,
          ifrh: parseInt(.75 * (w - 30)),
          diaw: w,
        }
      },
      editable(){
        return PermissionsHelper.has_edit_access(this.$store, this.course);
      }
    },
    methods: {
      open(content){
        this.content = content;
        this.visible = true;
      },
      close(){
        this.content = null;
        this.visible = false;
        this.$emit('close');
      },
      edit(evt){
        this.editing = true;
        this.md_temp = this.content.md || '';
        evt.stopPropagation();
      },
      save(evt){
        this.content.md = this.md_temp;
        this.saving = true;
        AppApi.save_content(this.course.code, this.content).then(()=>{
          this.editing = false;
          this.saving = false;
        });
        evt.stopPropagation();
      }
    },
    components: { VueMarkdown },
  }
</script>

<style scoped >
  .tabs-bar{
    background-color: white;
  }
</style>

<template>
  <div>
    <v-dialog fullscreen lazy v-model="visible" :width="sizes.diaw">
      <v-card v-if="visible">
        <v-toolbar dark color="primary">
          <v-btn icon @click.native="close()" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{content.name}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 sm8 offset-sm2>
              <iframe id="ytplayer" :src="iframe_src" 
                style="width: 100%" :height="sizes.ifrh"
                frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen/></iframe>
            </v-flex>
            <v-flex xs12 sm8 offset-sm2>
              <v-btn v-if="editable" @click="edit($event)">Editar</v-btn>
              <vue-markdown v-if="!editing" :source="content.md"></vue-markdown>
              <v-tabs v-if="editing" v-model="tab_active" class="my-3">
                <v-tabs-bar class="tabs-bar">
                  <v-tabs-item key="descricao" href="#descricao" ripple>
                    Descrição
                  </v-tabs-item>
                  <v-tabs-item key="preview" href="#preview" ripple>
                    Preview
                  </v-tabs-item>
                  <v-tabs-slider class="red"></v-tabs-slider>
                </v-tabs-bar>
                <v-tabs-content key="descricao" id="descricao">
                  <v-text-field label="Descrição" v-model="md_temp" multi-line></v-text-field>
                  <v-btn @click="save($event)" :loading="saving">Salvar</v-btn>
                </v-tabs-content>
                <v-tabs-content key="preview" id="preview">
                  <vue-markdown :source="md_temp"></vue-markdown>
                </v-tabs-content>
              </v-tabs>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
