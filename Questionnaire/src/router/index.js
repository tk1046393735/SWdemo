import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/page/Form'
import management from '@/page/management'
import handel from '@/components/Handel'
import demo from '@/components/demo'
import edit from '@/components/Edit'
import statistics from '@/components/Statistics'
import feedback from '@/components/Feedback'
import newsurvey from '@/components/NewSurvey'
import details from '@/components/Details'
import thank from '@/components/Thank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/form/:id',
      name: 'Form',
      component: Form
    },
    {
      path: '/thank',
      name: 'thank',
      component: thank
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
          path: '/edit/:id',
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
        },
        {
          path: '/new',
          name: 'new',
          component: newsurvey
        }
      ]
    },
    {
      path: '/details',
      name: 'details',
      component: details
    }
  ]
})
