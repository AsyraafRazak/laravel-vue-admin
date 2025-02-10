import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../Pages/Admin/Dashboard.vue';
import Users from '../Pages/Admin/Users.vue';
import Permissions from '../Pages/Admin/Permissions.vue';

const routes = [
    { path: '/admin', component: Dashboard },
    { path: '/admin/users', component: Users },
    { path: '/admin/permissions', component: Permissions },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
