
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'index' },
      { path: 'eventos/index', component: () => import('pages/Eventos/Index.vue'), name: 'evento.index' },
      { path: 'eventos/show/:id', component: () => import('pages/Eventos/Show.vue'), name: 'evento.show' },
      { path: 'eventos/form/:id?', component: () => import('pages/Eventos/Form.vue'), name: 'evento.form' },
      
      { path: 'asistentes/index', component: () => import('pages/Asistente/Index.vue'), name: 'asistente.index' },
      { path: 'asistentes/show/:id', component: () => import('pages/Asistente/Show.vue'), name: 'asistente.show' },
      { path: 'asistentes/form/:id?', component: () => import('pages/Asistente/Form.vue'), name: 'asistente.form' },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
