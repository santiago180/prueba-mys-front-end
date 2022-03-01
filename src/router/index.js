import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/auth/Login.vue')
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import( '../views/auth/Register.vue')
  },
  {
    path: '/factura',
    name: 'factura',
    component: () => import( '../views/invoice/List.vue')
  },
  {
    path: '/factura/crear',
    name: 'crear factura',
    component: () => import( '../views/invoice/Form.vue')
  },
  {
    path: '/factura/:id_v/ver',
    name: 'ver factura',
    component: () => import( '../views/invoice/Form.vue')
  },
  {
    path: '/factura/:id_e/editar',
    name: 'editar factura',
    component: () => import( '../views/invoice/Form.vue')
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
