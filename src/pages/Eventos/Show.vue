<template lang="pug">
    .q-pa-md-md
        .row.q-col-gutter-md(v-if="$apollo.loading")
            .col-md-4.col-12
                vcl-bullet-list
            .col-md-8.col-12
                vcl-table
        .row.q-col-gutter-md(v-else)
            //- | {{evento}}
            .col-md-4.col-12
                q-card
                    q-card-section
                        q-list
                            q-item-label(header) Evento
                            q-item
                                q-item-section(avatar top)
                                    q-avatar(icon="event" color="primary" text-color="white")
                                q-item-section
                                    q-item-label(lines="5") {{ evento.titulo }}
                                    q-item-label(caption) Título del evento
                            q-item
                                q-item-section(avatar top)
                                    q-avatar(icon="turned_in")
                                q-item-section
                                    q-item-label(lines="4") {{ evento.tipo_evento.descripcion }}
                                    q-item-label(caption) Tipo de evento
                            q-item
                                q-item-section(avatar top)
                                    q-avatar(icon="place")
                                q-item-section
                                    q-item-label(lines="4") {{ evento.ubigeo.distrito }}
                                    q-item-label(caption) Lugar
                            q-item
                                q-item-section(avatar top)
                                    q-avatar(icon="access_time")
                                q-item-section
                                    q-item-label(lines="4") {{ evento.fecha_inicio }}
                                    q-item-label(caption) Fecha de inicio
                            q-item
                                q-item-section(avatar top)
                                    q-avatar(icon="access_time")
                                q-item-section
                                    q-item-label(lines="4") {{ evento.fecha_final }}
                                    q-item-label(caption) Fecha de finalización
                           
            .col-md-8.col-12
                q-table( title="Personas que asistieron" :columns="columns" :data="evento.lista_asistentes")
                    template(v-slot:body="props")
                        q-tr(:props="props")
                            q-td(key="documento_identidad" :props="props")  {{props.row.asistente.documento_identidad}}
                            q-td(key="nombre" :props="props")  {{props.row.asistente.nombre}}
                            q-td(key="email" :props="props")  {{props.row.asistente.email}}
                            q-td(key="telefono" :props="props")  {{props.row.asistente.telefono}}
                            q-td(key="certificado" :props="props") 
                                q-badge(v-if="props.row.certificado") Certificado
                                q-badge(v-if="props.row.is_pagado") Pagado
</template>

<script>
import {QAvatar, QTable, QTr, QTd, QBadge} from 'quasar'
import {VclBulletList, VclTable} from 'vue-content-loading'
import gql from 'graphql-tag';
export default {
    components: {QAvatar, QTable, VclBulletList, VclTable, QTr, QTd, QBadge},
    apollo: {
        evento: {
            query: gql`query getEvento($id: ID){
                evento(id: $id){
                    tipo_evento{
                        descripcion
                    }
                    titulo
                    fecha_inicio
                    fecha_final
                    ubigeo{
                        distrito
                    }
                    lista_asistentes{
                        is_pagado
                        asistente{
                            documento_identidad
                            nombre
                            email
                            telefono
                        }
                    }
                }
            }`,
            // query: gql`query getEventoAsistentesSearchByIdEvento($id_evento: ID){
            //     EventoAsistentesSearchByIdEvento(id_evento: $id_evento){
            //         evento{
            //             titulo
            //         }
            //     }
            // }`,
            variables (){
                return {
                    id: this.$route.params.id
                }
            }
        }
    },
    created(){
        console.log('ID', this.$route.params.id);
        
    },
    data: () => ({
        evento: {},
        columns: [
            {align: 'left', name: 'documento_identidad', field: 'documento_identidad', label: 'Doc. Identidad'},
            {align: 'left', name: 'nombre', field: 'nombre', label: 'Nombre', sortable: true},
            {align: 'left', name: 'email', field: 'email', label: 'Correo electrónico'},
            {align: 'left', name: 'telefono', field: 'telefono', label: 'Teléfono'},
            {align: 'left', name: 'certificado', field: 'certificado', label: 'Certificado', sortable: true},
        ]
    })
}
</script>

<style>

</style>