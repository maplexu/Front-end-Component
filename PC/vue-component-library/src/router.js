import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Layout from './views/Layout.vue';
import Icon from './views/Icon.vue';
import Button from './views/Button.vue';
import Radio from './views/Radio.vue';
import Checkbox from './views/Checkbox.vue';
import Input from './views/Input.vue';
import InputNumber from './views/InputNumber.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/layout',
      name: 'layout',
      component: Layout,
    },
    {
      path: '/icon',
      name: 'icon',
      component: Icon,
    },
    {
      path: '/button',
      name: 'button',
      component: Button
    },
    {
      path: '/radio',
      name: 'radio',
      component: Radio
    },
    {
      path: '/checkbox',
      name: 'checkbox',
      component: Checkbox
    },
    {
      path: '/input',
      name: 'input',
      component: Input
    },
    {
      path: '/inputNumber',
      name: 'inputNumber',
      component: InputNumber
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
