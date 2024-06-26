import { createRouter, createWebHistory } from 'vue-router'
import MenuView from '../views/MenuView.vue'
const routes = [
  {
    path: '/menu',
    name: 'menu',
    component: MenuView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
