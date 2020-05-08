import Vue from 'vue'
import Router from 'vue-router'
import From from '@/components/From'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'From',
      component: From
    }
  ]
})
