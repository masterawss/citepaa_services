<template lang="pug">
    .q-pa-md-md
        q-card.no-shadow(v-if="$apollo.loading")
            q-card-section
                vcl-table
        q-table(v-else title="Eventos realizados" rows-per-page="0" :data="asistentes" :columns="columnas" row-key="id")
            template(v-slot:top)
                .text-h5 Lista de asistentes registrados
            template(v-slot:body="props")
                q-tr(:props="props")
                    q-td(key="id" :props="props") {{props.row.id}}
                    q-td(key="documento_identidad" :props="props") {{props.row.documento_identidad}}
                    q-td(key="nombre" :props="props") 
                        q-btn(flat dense @click="$router.push({name: 'asistente.show', params: {id: props.row.id}})") {{props.row.nombre}}
                    q-td(key="email" :props="props") {{props.row.email}}
                    q-td(key="telefono" :props="props") {{props.row.telefono}}
                    q-td(key="eventos" :props="props") {{props.row.cantidad_eventos}}
                //- q-space
                //- q-btn(  color="primary" :disable="loading" label="Nuevo evento" @click="$router.push({name: 'evento.form'})")
</template>

<script>
import {QTable, QTr, QTd} from 'quasar'
import {VclTable} from 'vue-content-loading'
import gql from 'graphql-tag';
export default {
    components: {QTable, QTr, QTd, VclTable},
    apollo: {
        asistentes: gql`query{
            asistentes{
                id
                documento_identidad
                nombre
                email
                telefono
                cantidad_eventos
            }
        }`
    },
    data: () => ({
        asistentes: [],
        columnas: [
            {name: 'id', field: 'id', label: 'ID', sortable: true},
            {name: 'documento_identidad', field: 'documento_identidad', label: 'DNI'},
            {name: 'nombre', field: 'nombre', label: 'Nombre', sortable: true},
            {name: 'email', field: 'email', label: 'Correo electrónico'},
            // {name: 'direccion', field: 'direccion', label: 'Dirección'},
            {name: 'telefono', field: 'telefono', label: 'Teléfono'},
            {name: 'eventos', field: 'cantidad_eventos', label: 'Eventos asistidos', sortable: true},
        ]
    })
}
</script>

<style>

</style>