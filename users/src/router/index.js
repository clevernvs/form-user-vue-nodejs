import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Home from '../views/Home.vue'
import Register from '../views/Register'
import Login from '../views/Login'
import Users from '../views/Users'
import Edit from '../views/Edit'
import AdminAuth from '../../../rest-api/middlewares/AdminAuth'

AdminAuth = (to, from, next) =>{
  if (localStorage.getItem('token') != undefined) {
    var req = {
      headers: {
        Authorization: "Bearer" + localStorage.getItem('token')
      }
    }

    axios
      .post("http://localhost:8686/validate", {}, req)
      .then(res => {
        console.log(res);
        next()
      })
      .catch(error => {
        console.log(error);
        next("/login")
      })

    next()
  } else {
    next('/login')
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users,
    beforeEnter: AdminAuth,
  },
  {
    path: '/admin/users/edit/:id',
    name: 'UserEdit',
    component: Edit,
    beforeEnter: AdminAuth,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
