import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'babel-polyfill';


// 初始化样式内容
import 'src/assets/styles/main.scss';

// 初始化注册全局指令：
import 'src/directives';

// 初始化注册全局组件：
import 'src/components';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
