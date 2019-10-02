<template lang="pug">
  q-layout(view='lHh Lpr lFf').bg-grey-1
    q-header(elevated)
      q-toolbar
        q-btn(flat='' dense='' round='' @click='leftDrawerOpen = !leftDrawerOpen' aria-label='Menu')
          q-icon(name='menu')
        q-toolbar-title
          | CITEPAA Servicios
        div Quasar v{{ $q.version }}
    q-drawer( bordered v-model='leftDrawerOpen' )
      q-list
        q-item-label(header='') Menú
        q-item(clickable='' @click="$router.push({name: 'evento.index'})")
          q-item-section(avatar='')
            q-icon(name='event')
          q-item-section
            q-item-label Eventos
        q-item(clickable @click="$router.push({name: 'asistente.index'})")
          q-item-section(avatar='')
            q-icon(name='group')
          q-item-section
            q-item-label Asistentes
        q-item(clickable='' tag='a' target='_blank' href='https://github.quasar.dev')
          q-item-section(avatar='')
            q-icon(name='work')
          q-item-section
            q-item-label Entidades
        q-item(clickable='')
          q-item-section(avatar='')
            q-icon(name='school')
          q-item-section
            q-item-label Certificaciones
        q-item(clickable='' tag='a' target='_blank' href='https://twitter.quasar.dev')
          q-item-section(avatar='')
            q-icon(name='receipt')
          q-item-section
            q-item-label Reportes
        //- q-item(clickable='' tag='a' target='_blank' href='https://facebook.quasar.dev')
          q-item-section(avatar='')
            q-icon(name='public')
          q-item-section
            q-item-label Facebook
    q-page-container
      router-view
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
