import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/LOGIN/Login.vue'
import Post from '../components/POST/POST.vue'
import NotFound from '../views/NotFound.vue'
import Master from '../page/layout/master.vue'
import home from '../components/home.vue'
import UserManual from '../components/UserManual/UserManual.vue'
import AnnounceEdit from '../components/AnnounceEdit/AnnounceEdit.vue'
import ViewEdit from '../components/ViewEdit/ViewEdit.vue'
import Profile from '../components/Profile/Profile.vue'
const routes = [
      {
        name: "Master",
        path: '/',
        component: Master,
        redirect: '/home',
        children: [
            {
                name: 'home',
                path: '/home',
                component: home
            },
            {
                name: 'Login',
                path: '/login',
                component: Login
            },
            {
                name: 'UserManual',
                path: '/usermanual',
                component: UserManual
            },
            {
                name: 'Post',
                path: '/post',
                component: Post
            },
            {
                name: 'AnnounceEdit',
                path: '/announceedit',
                component: AnnounceEdit
            },
            {
                name: 'ViewEdit',
                path: '/viewedit',
                component: ViewEdit
            },
            {
                name: 'Profile',
                path: '/profile',
                component: Profile
            }


        ]
      },
    // {
    //     path: '/page',
    //     name: 'Page',
    //     component: PAGE,
    // },
    // {
    //     path: '/login',
    //     name: 'LOGIN',
    //     component: LOGIN
    // },
    // {
    //     path: '/POST',
    //     name: 'POST',
    //     component: POST
    // },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
    //   {
    //     path: '/profile',
    //     name: 'profile',
    //     component: Profile,
    //   },
    //   {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    //   }
]
const router = createRouter({
    history: createWebHistory('/'),
    routes,
    linkActiveClass: "active", // active class for non-exact links.
    linkExactActiveClass: "active" // active class for *exact* links.
})

export default router