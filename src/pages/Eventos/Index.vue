<template lang="pug">
    div.q-pa-md-md
        q-card(v-if="$apollo.loading")
            q-card-section
                vcl-table

        q-table(v-else title="Eventos realizados" :data="eventos" :columns="columnas" row-key="id" :filter="filter")
            template(v-slot:body="props")
                q-tr(:props="props")
                    q-td( style="width:100px" key="id" :props="props") {{props.row.id}}
                    q-td(  key="tipo_evento" :props="props") {{props.row.tipo_evento.descripcion}}
                    q-td( style="width:100px" key="titulo" :props="props") 
                        q-btn(flat dense no-caps @click="$router.push({name: 'evento.show', params: {id: props.row.id}})") {{props.row.titulo.substring(0,40)}}
                    q-td( style="width:100px" key="count_asistentes" :props="props") {{props.row.count_asistentes}}
                    q-td( style="width:100px" key="lugar" :props="props") {{props.row.ubigeo.distrito}}
                    q-td( style="width:100px" key="fecha_inicio" :props="props") {{props.row.fecha_inicio}}
                    q-td( style="width:100px" key="fecha_final" :props="props") {{props.row.fecha_final}}
                    q-td
                        q-btn(flat dense icon="more_vert")
                            q-menu(auto-close)
                                q-list
                                    q-item(clickable @click="$router.push({name: 'evento.form', params: {id: props.row.id}})")
                                        q-item-section Editar
                                    q-item(clickable @click="eliminarEvento(props.row.id)")
                                        q-item-section Elimnar
            template(v-slot:top)
                .text-h5 Lista de eventos realizados
                q-space
                q-input(borderless dense debounce="300" color="primary" v-model="filter")
                    template(v-slot:append)
                        q-icon(name="search")
                q-btn(  color="primary" :disable="loading" label="Nuevo evento" @click="$router.push({name: 'evento.form'})")
</template>

<script>
import gql from 'graphql-tag'
import {VclTable} from 'vue-content-loading'
import {QTable, QSpace, QTr, QTd, QInput, QMenu} from 'quasar'
export default {
    components: {QTable, QSpace, QTr, QTd, QInput, QMenu, VclTable},
    apollo: {
        eventos: gql`query {
            eventos{
                id
                titulo,
                fecha_inicio
                fecha_final
                count_asistentes
                ubigeo{
                    id_ubigeo
                    distrito
                }
                tipo_evento{
                    id
                    descripcion
                }
            }
        }`
    },
    created(){

    },
    data: () => ({
        loading: false,
        filter: '',
        eventos: [],
        columnas: [
            {align: 'left', name: 'id', label: 'ID', field: 'id'},
            {align: 'left', name: 'tipo_evento', label: 'Tipo de evento', field: row => row.tipo_evento.descripcion.substring(0,20) + "...", sortable: true},
            {align: 'left', name: 'titulo', label: 'Título', field: row=>row.titulo.substring(0,45) + "..."},
            {align: 'left', name: 'count_asistentes', label: 'Participantes', field: 'count_asistentes', sortable: true},
            {align: 'left', name: 'lugar', label: 'Lugar', field: row => row.ubigeo.distrito },
            {align: 'left', name: 'fecha_inicio', label: 'Fecha de Inicio', field: 'fecha_inicio', sortable: true},
            {align: 'left', name: 'fecha_final', label: 'Fecha final', field: 'fecha_final', sortable: true},
            {align: 'left', name: 'acciones', label: 'Acciones', field: 'acciones', sortable: true},
        ]
    }),
    methods: {
        eliminarEvento(id){
            this.$q.dialog({
                title: 'Eliminar',
                message: '¿Estás seguro de eliminar el evento?',
                ok: 'Borrar',
                cancel: 'Cancelar'
            }).onOk(() => {
                this.$q.notify('Eliminar')
            })
        }
    }
}   
</script>

<style>

</style>