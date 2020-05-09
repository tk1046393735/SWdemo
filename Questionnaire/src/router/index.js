import Vue from 'vue'
import Router from 'vue-router'
import From from '@/page/From'
import management from '@/page/management'
import handel from '@/components/Handel'
import demo from '@/components/demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'From',
      component: From
    },
    {
      path: '/management',
      name: 'management',
      redirect: 'handel',
      component: management,
      children: [
        {
          path: '/handel',
          name: 'handel',
          component: handel
        },
        {
          path: '/demo',
          name: 'demo',
          component: demo
        }
      ]
    }
  ]
})
