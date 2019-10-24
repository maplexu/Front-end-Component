/*
  封装常见的一些DOM操作方法
 */

import Vue from 'vue';

const isServer = Vue.prototype.$isServer;                             // $isServer实例属性，用于判断当前vue实例是否运行于服务器
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;                       // 特殊字符 （其中的.表示匹配任意字符）
const MOZ_HACK_REGEXP = /^moz([A-Z])/;                                // 匹配MOZ
const ieVersion = isServer ? 0 : Number(document.documentMode);       // documentMode 是IE特有的属性，用于返回浏览器渲染文档的模式，例如在IE5下，就会返回5

// 去除字符前后的空格
const trim = function(string) {
  // \s: 空格；
  // \uFEFF: 字节次序标记字符（Byte Order Mark）,也就是BOM，它是es5新增的空白符
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
}

// 转换成驼峰命名
const camelCase = function(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function(_, separatoe, letter, offet) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};


// 封装事件绑定方法（针对IE和非IE）
export const on = (function() {
  if(!isServer && document.addEventListener) {
    return function(element, event, handler) {
      if(element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if(element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

// 封装事件解绑方法（针对IE和非IE）
export const off = (function() {
  if(!isServer && document.removeEventListener) {
    return function(element, event, handler) {
      if(element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if(element && event) {
        element.detach('on' + event, handler);
      }
    }
  }
})()

// 封装事件绑定方法（绑定一次）
export const once = function(el, event, fn) {
  var listener = function() {
    if(fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  }

  on(el, event, listener);
}


// 封装的判断某个元素是否有某个class
/*
  备注：（参考文章：https://my.oschina.net/hmj/blog/178397）
    element.className：字符串，返回的是元素上面的class，例如：`class1 class2`
    element.classList：特殊结构列表，对element.className的字符串进行空格分割后的集合列表
      注意：
        1. classList提供了多种操作方法
          * clsssList.item(1)——获取该集合中索引为1的类型;
          * clsssList.add('cls1')——添加类
          * clsssList.remove('cls1')——删除类
          * clsssList.contains('cls1')——判断是否包含类
          * clsssList.toggle('cls1')——有则删除，无则添加
        2. classList的兼容性问题
          * 是新的标准（H5出现的），各浏览器对它的支持差别较大，IE中IE10之后才支持，可以通过hack手段（使用className）来解决这一问题
 */
export function hasClass(el, cls) {
  if(!el || !cls) return false;
  if(cls.indexOf(' ') !== -1) throw new Error('className should not contain space');
  if(el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}

// 封装的给元素添加class操作
export function addClass(el, cls) {
  if(!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for(var i = 0, j = classes.length; i < j; i++) {
    var tempCls = classes[i];
    if(!tempCls) contine;

    if(el.classList) {
      el.classList.add(tempCls);
    } else if(!hasClass(el, tempCls)) {
      curClass += ' ' + tempCls;
    }
  }
  if(!el.classList) {
    el.className = curClass;
  }
}

// 封装的移除元素上class的操作
export function removeClass(el, cls) {
  if(!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for(var i = 0, j = classes.length; i < j; i++) {
    var tempCls = classes[i];
    if(!tempCls) continue;

    if(el.classList) {
      el.classList.remove(tempCls);
    } else if (hasClass(el, tempCls)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if(!el.classList) {
    el.className = trim(curClass);
  }
}

// 封装的获取元素的样式；
/*
  备注：
    获取元素的行间（内联）样式：el.style[styleName]
    获取元素的非行间样式：
      低版本IE（<9）：el.currentStyle[styleName]
      其他：window.getComputedStyle(el, null)[styleName]，等价于`document.defaultView.getComputedStyle(elem1, null)`
 */
export const getStyle = ieVersion < 9 ?
function(element, styleName) {
  if(isServer) return;
  if(!element || !styleName) return null;
  styleName = camelCase(styleName);         // 将样式名都转换成驼峰写法
  if(styleName === 'float') {               // 如果是float样式，则需要替换下名字
    styleName = 'styleFloat';
  }

  try {
    switch(styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100;
        } catch(e) {
          return 1.0;
        }
      default:
        return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null);
    }
  } catch(e) {
    return element.style[styleName];
  }
}
:
function(element, styleName) {
  if(isServer) return;
  if(!element || !styleName) return null;
  styleName = camelCase(styleName);
  if(styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch(e) {
    return element.style[styleName];
  }
};

// 封装的设置元素样式的操作：
export function setStyle(element, styleName, value) {
  if(!element || !styleName) return;

  if(typeof styleName === 'object') {
    for(var prop in styleName) {
      if(styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if(styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : `alpha(opacity=${value*100})`;
    } else {
      element.style[styleName] = value;
    }
  }
}
