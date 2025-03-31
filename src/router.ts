import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Profile from '@/components/Profile.vue'
import Works from '@/components/Works.vue'
const modules = import.meta.glob('@/components/Works/(?!Short|Long_tmp)*.vue', { eager: true });


const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/Profile', name: 'Profile', component: Profile },
    { path: '/Works', name: 'Works', component: Works }
]


const worksLong = Object.entries(modules).map(([path, module]) => {
    const name = path.split('/').pop()?.replace('.vue', '');
    return {
        path: '/Works/'+name,
        name:name || '',
        component: (module as any).default
    };
})
routes.push(...worksLong);

const router = createRouter({
    history: createWebHashHistory('/myPortfolio/'),
    routes: routes
})

export default router