<template lang="pug">
    .q-pa-md-xl
        q-stepper(v-model="step" ref="stepper" color="primary" animated :contracted="$q.screen.lt.md")
            q-step(
            name="evento"
            title="Registro del evento"
            icon="settings"
            :done="step > 1")
                .row.items-center.q-mx-md-xl
                    .col-md-6.q-px-md-xl
                        q-select(label="Tipo de evento" :options="tipo_eventos" option-value="id" option-label="descripcion" v-model="form.evento.tipo_evento")
                        q-input(label="Nombre del evento" v-model="form.evento.titulo")
                        q-input(label="Descripción del evento" v-model="form.evento.descripcion")
                        q-input(label="Dirección" v-model="form.evento.direccion")
                        q-input(label="Fecha de inicio" v-model="form.evento.fecha_inicio" type="date")
                        q-input(label="Fecha de término" v-model="form.evento.fecha_final" type="date")
                        .q-pt-md
                            w-modal-buscar-ubigeo(:ubigeo="ubigeo" :open="widget.modal_buscar_ubigeo" @close="widget.modal_buscar_ubigeo = false" @selected="seleccionarUbigeo")
                            q-item
                                q-item-section
                                    q-item-label(v-if="form.evento.ubigeo") {{form.evento.ubigeo | lugar}}
                                    q-item-label(caption) Lugar
                                q-item-section(avatar)
                                    q-btn( dense round color="teal" text-color="white" icon="search" @click="widget.modal_buscar_ubigeo = true")
                            //- .text-grey(v-if="form.evento.ubigeo")
                            //-     | {{form.evento.ubigeo | lugar}}
                            //- q-btn(label="Buscar ubigeo" rounded color="primary" )
                        //- q-select(
                        //-     label="Lugar del evento" 
                        //-     v-model="form.evento.ubigeo" 
                        //-     :options="ubigeo" 
                        //-     option-value="id_ubigeo" 
                        //-     :option-label="opt => opt.distrito+', '+opt.provincia+', '+opt.departamento"
                        //-       )
                        
                    .col-md-6(v-if="!$q.screen.lt.md")
                        .text-center
                            img(src="../../statics/upload.png" width="300")
                            br
                            q-btn(label="Importar Excel" color="green")
                            .text-grey.q-mt-md.q-mb-sm Usa la plantilla para ingresar los datos por medio de Excel
                            q-btn(label="Descargar plantilla" flat no-caps color="primary")
            
            //- STEP 2 ASISTENTES ----------------------------------------------------------------------------------------
            q-step(
            name="asistentes"
            title="Registro de asistentes"
            icon="settings"
            :done="step > 2")
                //- | {{ form.evento.lista_asistentes }}
                q-table(flat :data="form.evento.lista_asistentes" :columns="table_asistentes_columns" row-key="id" )
                    template(v-slot:top)
                        .text-h5 Personas que asistieron
                        q-space
                        q-btn(  color="primary" :disable="widget.loading" label="Agregar asistente" @click="widget.modal_new_asistente = true" )

                    template(v-slot:body="props")
                        q-tr(:props="props")
                            
                            q-td(key="documento_identidad" :props="props") 
                                |{{props.row.asistente.documento_identidad}}
                            q-td(key="nombre" :props="props") {{props.row.asistente.nombre}}
                            q-td(key="ocupacion" :props="props") {{props.row.asistente.ocupacion}}
                            q-td(key="email" :props="props") {{props.row.asistente.email}}
                            q-td(key="telefono" :props="props") {{props.row.asistente.telefono}}
                            q-td(key="ubigeo" :props="props") {{props.row.asistente.ubigeo}}
                            q-td(auto-width)
                                q-checkbox(dense v-model="props.row.certificado")
                            q-td(auto-width)
                                q-checkbox( dense v-model="props.row.is_pagado")
                            q-td(auto-width)
                                q-btn(dense flat icon="close" @click="eliminar(props.row.asistente.documento_identidad)")
                //- MODAL AGREGAR ASISTENTE
                w-modal-new-asistente(:open="widget.modal_new_asistente" @addAsistente="addAsistente" @close="widget.modal_new_asistente = false")
            //- NAVEGACIÓN ------------------------------------------------------------------------------------------------
            template(v-slot:navigation)
                q-stepper-navigation
                q-btn( v-if="step == 'evento'" @click="$refs.stepper.next()" color="primary" label="Siguiente")
                q-btn( v-if="step == 'asistentes'" flat color="primary" @click="$refs.stepper.previous()" label="Atrás" class="q-ml-sm")
                q-btn( v-if="step == 'asistentes'" @click="guardar" color="primary" label="Guardar")
            
            
</template>

<script>
import {QStepper, QStep, QStepperNavigation, QInput, QSelect, QTable, QSpace, QTr, QTd, QCheckbox} from 'quasar'
import WModalNewAsistente from '../../components/ModalNewAsistente'
import WModalBuscarUbigeo from '../../components/ModalBuscarUbigeo'
import gql from 'graphql-tag';
export default {
    components: {QStepper, QStep, QStepperNavigation, QInput, QSelect, QTable, QSpace, WModalNewAsistente,WModalBuscarUbigeo, QTr, QTd, QCheckbox},
    apollo: {
        tipo_eventos: gql`query {
            tipo_eventos{   
                id
                descripcion
            }
        }`,
        ubigeo: gql`query{
            ubigeo{
                id_ubigeo
                distrito
                provincia
                departamento
            }
        }`
    },
    created(){
        let id = this.$route.params.id
        if(id){
            this.$apollo.query({
                    query: gql`query getEvento($id: ID){
                        evento(id: $id){
                            id
                            titulo
                            descripcion
                            direccion
                            fecha_inicio
                            fecha_final
                            tipo_evento{
                                id
                                descripcion
                            }
                            ubigeo{
                                id_ubigeo
                                distrito
                                provincia
                                departamento
                            }
                            lista_asistentes{
                                is_pagado
                                certificado
                                codigo_certificado
                                asistente{
                                    id
                                    documento_identidad
                                    nombre
                                    email
                                    telefono
                                    ubigeo{
                                        id_ubigeo
                                        distrito
                                    }
                                }
                            }
                        }
                    }`,
                    variables:{
                        id
                    }
            }).then(r => {
                this.form.evento = r.data.evento
                // this.form.asistentes = r.data.evento.asistentes
            }).catch(e => {
                this.$q.notify('Error obteniendo los datos')
            })
        }
    },
    data: () => ({
        tipo_eventos: [],
        ubigeo: [],
        evento: {},
        widget: {
            modal_buscar_ubigeo: false,
            modal_new_asistente: false,
            loading: false,
        },
        tipos: [
            'ASISTENCIA TÉCNICA ESPECÍFICA',
            'ASISTENCIA TÉCNICA DE PROGRAMA',
            'DISEÑO Y/O MODELAJE',
            'DESARROLLO DE PROTOTIPO',
            'SOPORTE PRODUCTIVO',
            'ENSAYOS DE LABORATORIO - PRUEBAS FISICAS',
            'CURSOS',
            'PASANTÍAS EN EL CITE',
            'CERTIFICACIÓN DE COMPETENCIAS LABORALES',
            'CHARLAS TÉCNICAS - TALLERES',
            'ATENCIÓN DE INFORMACIÓN TECNOLÓGICA',
            'DIFUSIÓN DE INFORMACIÓN SOBRE AVANCES',
            'PROYECTOS DE INVESTIGACIÓN, DESARROLLO E INNOVACIÓN EN ASOCIACIÓN CON EMPRESAS, UNIVERSIDADES, TECNOLÓGICOS Y OTRAS INSTITUCIONES',
            'PUBLICACIONES CIENTÍFICAS REALIZADAS POR EL CITE',
            'ASESORAMIENTO EN EL DESARROLLO DE TESIS Y/O POSTGRADO EN EL ÁMBITO DE LA CADENA PRODUCTIVA',
            'PARTICIPACIÓN EN COMITÉ DE NORMAS TÉCNICAS',
            'ELABORACIÓN DE PERFIL DE COMPETENCIA',
            'ARTICULACIÓN CON INSTITUCIONES PRIVADAS',
            'ARTICULACIÓN CON OTRAS INSTITUCIONES DEL ESTADO',],
        step: 'evento',
        table_asistentes_columns: [
            {align: 'left', name: 'documento_identidad', field: 'documento_identidad', label: 'Doc. Identidad'},
            {align: 'left', name: 'nombre', field: 'nombre', label: 'Nombres', sortable: true},
            {align: 'left', name: 'ocupacion', field: 'ocupacion', label: 'Ocupación/Entidad', sortable: true},
            {align: 'left', name: 'email', field: 'email', label: 'Correo electrónico'},
            {align: 'left', name: 'telefono', field: 'telefono', label: 'Teléfono'},
            {align: 'left', name: 'ubigeo', field: 'ubigeo', label: 'Distrito', sortable: true},
            {align: 'left', name: 'certificado', field: 'certificado', label: 'Certificado'},
            {align: 'left', name: 'pagado', field: 'pagado', label: 'Pagado'},
            {align: 'left', name: 'acciones', field: 'acciones', label: 'Acciones'},
        ],
        form: {
            evento: {
                tipo_evento: {},
                ubigeo: {},
                lista_asistentes: []
            },
            // asistentes: []
        }
    }),
    filters: {
        lugar(val){
            return val.distrito + ', ' + val.provincia + ', ' + val.departamento
        }
    },
    methods: {
        addAsistente(new_asistente){
            let new_data = new_asistente
            console.log('ASISTENTE', new_data)
            this.form.evento.lista_asistentes.push(new_data)
            this.widget.modal_new_asistente = false
        },
        guardar(){
            this.widget.loading = true
            console.log('ENVIANDO EVENTO', this.form.evento);
            
            this.$axios.post('/evento', {
                evento: this.form.evento,
            }).then(r => {
                this.$q.notify('Guardado')
                console.log('RESPUESTA', r);
            }).catch(e => {
                console.log('ERROR', e)
            }).finally( () => {
                this.widget.loading = false
            })
        },
        eliminar(documento_identidad){
            this.$q.dialog({
                message: '¿Está seguro de eliminar?',
                title: 'Eliminar asistente de la lista',
                ok: 'Eliminar',
                cancel: 'Cancelar'
            }).onOk(() => {
                this.form.evento.lista_asistentes = this.form.evento.lista_asistentes.filter((asistente) => {
                    console.log('DNI ASISTENTE', asistente.asistente.documento_identidad);
                    console.log('DNI', documento_identidad);
                    
                    return asistente.asistente.documento_identidad !== documento_identidad
                })
            })
        },
        // filterUbigeo (val, update) {
        //     if (val === '') {
        //         update(() => {
        //             this.ubigeo = stringOptions
        //         })
        //         return
        //     }

        //     update(() => {
        //         const needle = val.toLowerCase()
        //         this.ubigeo = ubigeo.filter(v => v.toLowerCase().indexOf(needle) > -1)
        //     })
        // }
        seleccionarUbigeo(ubigeo){
            this.form.evento.ubigeo = ubigeo
        }
    }
}
</script>

<style>

</style>