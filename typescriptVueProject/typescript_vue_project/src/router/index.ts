import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/registration',
    name: 'RegistrationForm',
    component: () => import('../views/RegistrationForm.vue')
  },
  {
    path: '/login',
    name: 'LoginForm',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/logout',
    name: 'LogoutForm',
    component: () => import('../views/Logout.vue')
  },
  {
    path: '/jsPlaceholder',
    name: 'jsPlaceholderView',
    component: () => import('../views/jsPlaceHolderView.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  let g_logged_in:boolean
  //console.log("BeforeEach Called");
  if(localStorage.getItem('currentUser')!=null){
     g_logged_in=true;
  }else{
     g_logged_in=false;
  }
  
  if(to.name == 'LoginForm' && g_logged_in==true) next({name: 'Home'});
  else if(to.name == 'LogoutForm' && g_logged_in==false) next({name: 'Home'});
  else next()
})

export default router
