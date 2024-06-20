import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import("../components/Products.vue")
    },
    {
        path: '/product/:code/detail',
        name: 'product-detail',
        component: () => import("../components/ProductDetail.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;