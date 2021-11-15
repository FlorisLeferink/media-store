import { createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import("@/pages/homepage"),    
    },
    {
        path: '/MovieInfo/:id',
        name: 'MovieInfo',
        component: () => import("@/pages/movie-info"),
    },
    {
        path: '/MovieGenre/:genre',
        name: 'MovieGenre',
        component: () => import("@/pages/movie-genre-overview"),
    },    
    {
        path: '/WishList',
        name: 'WishList',
        component: () => import("@/pages/wishlist"),
    },
    {
        path: '/notfound',
        name: '404',
        component: () => import("@/pages/404.vue"),
        
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

