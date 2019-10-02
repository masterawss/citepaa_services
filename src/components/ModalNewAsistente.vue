<template lang="pug">
    q-dialog(v-model="open" :maximized="$q.screen.lt.md" persistent )
        q-card(style="min-width: 30vw;")
            q-card-section
                .text-h5 Agregar asistente
                q-input(label="DNI" v-model="form.asistente.documento_identidad")
                    template(v-slot:after)
                        q-btn(round dense flat icon="search" @click="buscar" :loading="loading")
                q-input(label="Nombre" v-model="form.asistente.nombre")
                q-input(label="Ocupación/Entidad" v-model="form.asistente.ocupacion")
                q-input(label="Correo electrónico" v-model="form.asistente.email")
                q-input(label="Teléfono" v-model="form.asistente.telefono")
                q-input(label="Ubigeo" v-model="form.asistente.ubigeo")
                q-checkbox.q-my-md(label="Pagado" v-model="form.is_pagado")
                q-checkbox.q-my-md(label="Generar certificado" v-model="form.certificado")
                .text-center.q-mt-md
                    q-btn(label="Cancelar" @click="cancelar" flat )
                    q-btn(label="Agregar"  @click="addAsistente" color="primary")
</template>

<script>
import { QDialog, QInput, QCheckbox } from 'quasar'
import gql from 'graphql-tag';
export default {
    components: {QDialog, QInput, QCheckbox},
    props: ['open'],
    data: () => ({
        form: {
            asistente: {},
            is_pagado: false,
            certificado: false
        },
        loading: false
    }),
    methods: {
        addAsistente(){
            // let ais
            let data = JSON.parse(JSON.stringify(this.form))
            this.$emit('addAsistente', data)
            this.form.asistente = {}
            this.form.is_pagado = false
            this.form.certificado = false
            this.$emit('close')
        },
        cancelar(){
            this.form.asistente = {}
            this.form.is_pagado = false
            this.form.certificado = false
            this.$emit('close')
        },
        buscar(){
            this.loading = true
            console.log('DNI', this.form.asistente.documento_identidad);
            this.$apollo.query({
                query: gql`query getAsistente($documento_identidad: String) {
                    asistente(documento_identidad: $documento_identidad){
                        documento_identidad
                        nombre
                        direccion
                        email
                        telefono
                    }
                }`,
                variables:{
                    documento_identidad: this.form.asistente.documento_identidad
                }
                
            }).then(e => {
                this.form.asistente = e.data.asistente
                console.log('RESPUESTA', e);
            }).catch(e => {
                console.log('ERROR', e);
            }).finally(() => {
                this.loading = false
            })
            // this.form.dni =
        }
    }
}
</script>

<style>

</style>