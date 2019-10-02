<template lang="pug">
    .q-pa-md-lg
        .flex.flex-center(v-if="$apollo.loading")
            q-circular-progress(
                indeterminate
                size="45px"
                :thickness="1"
                color="white"
                track-color="primary"
                class="q-ma-md")
        .row.q-col-gutter-md(v-else)
            .col-lg-4.col-12.col-md-12.col-sm-12
                q-card
                    q-card-section
                        q-list
                            q-item-label(header) Asistente
                            q-item
                                q-item-section(avatar top)
                                    q-avatar(icon="person" color="primary" text-color="white")
                                q-item-section
                                    q-item-label(lines="1") {{ asistente.nombre }}
                                    q-item-label(caption) Nombre
                            q-item
                                q-item-section(avatar top)
                                    q-avatar(icon="more")
                                q-item-section
                                    q-item-label(lines="1") {{ asistente.documento_identidad }}
                                    q-item-label(caption) Documento de Identidad
                            q-item
                                q-item-section(avatar top)
                                    q-avatar(icon="email")
                                q-item-section
                                    q-item-label(lines="1") {{ asistente.email }}
                                    q-item-label(caption) Correo electrónico
                            q-item
                                q-item-section(avatar top)
                                    q-avatar(icon="local_phone")
                                q-item-section
                                    q-item-label(lines="1") {{ asistente.telefono }}
                                    q-item-label(caption) Teléfono
                            q-item
                                q-item-section(avatar top)
                                    q-avatar(icon="navigation" )
                                q-item-section
                                    q-item-label(lines="1") {{ asistente.ubigeo !== null ? asistente.ubigeo.distrito : 'Sin datos' }}
                                    q-item-label(caption) Dirección
                        //- | {{asistente}}
            .col-lg-8.col-12.col-md-12.col-sm-12
                q-table(title="Eventos a los que ha asistido"
                    :data="asistente.eventos"
                    :columns="columnas")
                //- q-card
                    q-card-section
                        q-item-label(header) Eventos a los que ha asistido
</template>

<script>
import gql from 'graphql-tag';
import { QAvatar, QTable } from 'quasar'
export default {
    components: { QAvatar, QTable },
    apollo: {
        asistente: {
            query: gql`query getAsistente($id: ID){
                asistente(id: $id){
                    nombre
                    documento_identidad
                    email
                    direccion
                    telefono
                    ubigeo{
                        distrito
                    }
                    eventos{
                        tipo_evento{
                            descripcion
                        }
                        titulo
                        fecha_inicio
                        ubigeo{
                            distrito
                        }
                    }
                }
            }`,
            variables (){
                return {
                    id: this.$route.params.id
                }
            }
        }
    },
    data: () => ({
        asistente: {},
        columnas: [
            { align: 'left',name: 'tipo_evento', field: row=> row.tipo_evento.descripcion , label: 'Tipo de evento'  },
            { align: 'left',name: 'titulo', field: row => row.titulo.substring(0,40), label: 'Título' },
            { align: 'left',name: 'distrito', field: row=> row.ubigeo !== undefined ? row.ubigeo.distrito : '--' , label: 'Distrito' },
            { align: 'left',name: 'fecha_inicio', field: 'fecha_inicio', label: 'Fecha de inicio' },
        ]
    })
}
</script>

<style>

</style>