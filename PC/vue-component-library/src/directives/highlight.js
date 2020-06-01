/**
 * 封装 highlight.js 插件实现的代码高亮指令
*/

import Hljs from 'highlight.js';
//import 'highlight.js/styles/tomorrow-night.css';
import 'highlight.js/styles/solarized-dark.css';

Hljs.initHighlightingOnLoad();
const Highlight = {};

Highlight.install = (Vue) => {
  Vue.directive('highlight', {
    // 被绑定元素插入父节点时调用
    inserted(el) {
      const blocks = el.querySelectorAll('pre code');
      console.log('检测到指定的block元素', blocks);
      for (let i = 0; i < blocks.length; i += 1) {
        Hljs.highlightBlock(blocks[i]);
      }
    },
  });
};

export default Highlight;
