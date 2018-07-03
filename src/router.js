import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Post from './views/Post.vue'
import Article from './views/Article.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/post',
      name: 'post',
      component: Post,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    }
  ]
})
