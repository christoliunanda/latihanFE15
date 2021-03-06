import Session from '@/common/Session'
import Vue from 'vue'
import VueRouter, { NavigationGuardNext, Route, RouteConfig, RouteRecord } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'login',
    meta: {deniedAuth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: {requiredAuth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
  const validate = (record: Route | RouteRecord, key: string) => {
    record = record === null? to : record;

    return typeof record.meta[key] === "function"
      ? record.meta[key](to)
      : record.meta[key];
  };

  const requiredAuth: boolean = to.matched.some((r: RouteRecord) => validate(r, 'requiredAuth'));
  const deniedAuth: boolean = to.matched.some((r: RouteRecord) => validate(r, 'deniedAuth'));

  
  if(requiredAuth && !Session.isLogin()){
    return next({path:'/'});
  }else if (Session.isLogin() && deniedAuth){
    return next ({path:'/home'});
  }

  return next();
});

export default router
