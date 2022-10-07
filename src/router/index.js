import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/home.page.vue'
import About from '@/pages/about.page.vue'
import Repository from '@/pages/repodetail.page.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/repo/:owner/:repo',
        name: 'Repo',
        component: Repository,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router