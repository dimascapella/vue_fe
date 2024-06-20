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
    },
    {
        path: '/product/:code/edit',
        name: 'product-edit',
        component: () => import("../components/ProductEdit.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;