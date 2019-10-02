<template lang="pug">
  q-dialog(v-model="open" persistent :maximized="$q.screen.lt.md")
    q-card
        q-card-section
            q-input(v-model="txt_ubigeo" label="Ingrese el distrito")

            q-list(bordered separator)
                q-item(v-for="lugar in filterUbigeo" :key="lugar.id_ubigeo")
                    q-item-section
                        | {{ lugar | formateado }}
                    q-item-section(avatar)
                        q-btn(color="primary" @click="seleccionar(lugar)" icon="add" dense round)
            q-btn(label="Cancelar" flat @click="$emit('close')")
            //- q-btn(label="Aceptar" color="primary")
</template>

<script>
import {QDialog, QInput} from 'quasar'
export default {
    props: ['open', 'ubigeo'],
    components: {QDialog, QInput},
    data: () => ({
        txt_ubigeo: ''
    }),
    filters: {
        formateado(val){
            return val.distrito + ', ' + val.provincia + ', ' + val.departamento
        }
    },
    computed: {
        filterUbigeo(){
            if(this.txt_ubigeo.length < 3){
                console.log('CORTO');
                
                return this.ubigeo.slice(0, 10)
            }else{
                return this.ubigeo.filter(u => {
                    return u.distrito.toLowerCase().includes(this.txt_ubigeo.toLowerCase())
                })
            }
        }
    },
    methods:{
        seleccionar(ubigeo){
            let u = ubigeo
            this.$emit('selected', u)
            this.$emit('close')
        }
    }
}
</script>

<style>

</style>