/**
 *  全局组件入口
*/
import Vue from 'vue';

import DemoBlock from 'business-comp/demo-block';

import Row from 'basic-comp/layout/row/row.vue';
import Button from 'basic-comp/button/button.vue';

Vue.component('xu-row', Row);
Vue.component('xu-button', Button);
Vue.component('xu-button-group', null);
Vue.component('xu-tooltip', null);

Vue.component('demo-block', DemoBlock);
