import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/page/Form'
import management from '@/page/management'
import handel from '@/components/Handel'
import demo from '@/components/demo'
import edit from '@/components/edit'
import statistics from '@/components/Statistics'
import feedback from '@/components/Feedback'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Form',
      component: Form
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
        },
        {
          path: '/edit',
          name: 'edit',
          component: edit
        },
        {
          path: '/statistics',
          name: 'statistics',
          component: statistics
        },
        {
          path: '/feedback',
          name: 'feedback',
          component: feedback
        }
      ]
    }
  ]
})
