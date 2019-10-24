**总结：**
1. `input元素的一些原生属性总结：
  * `autocomplete`：自动完成（一般在某个输入框输入一次内容，表单提交后，）
  * `form`：属于某个表单或多个表单
  * `min/max`：输入字段的最小/最大值
  * `type`：表单元素的类型
  * ...

2. 直接使用`v-bind=obj对象`，即可将一个对象直接绑定到某个元素上，常见的应用场景如下：
  * 自定义封装表单组件，在表单组件上使用原生表单元素的属性
  * 组件内部，通过`v-bind=$attrs`将未注册到`props`的属性都传给原生表单元素，简化了`prop`的传递过程

3. `textarea`高度随内容高度自适应变化的处理逻辑：
  1. 新建一个空的`textarea`元素，命名为 `tmpText`
  2. 计算当`tmpText`的内容为空时，它的高度，即为`textarea`元素一行文本的高度，该高度与配置的最小行数和最大行数相乘，即可得到`textarea`元素的最小高度值和最大高度值
  3. 计算当`tmpText`的内容就是我们自己的`textarea`元素的内容时，整个内容的高度（`scrollHeight`可获取到内容的高度，即使被卷去了）
    * 若内容的高度在最大最小高度之间，则设置文本框的`height` = 内容的高度(`scrollHeight`)
    * 若内容的高度小于最小高度，则设置文本框的`height` = 最小高度
    * 若内容的高度大于最大高度，则设置文本框的`height` = 最大高度



**学习：**
1. 三个`composition`事件：
  1. `compositionstart`：一段文字输入之前触发
  2. `compositionupdate`：字符被输入到一段文字时触发
  3. `compositionend`：文本段落的组成完成或取消时触发
2. css3 resize属性：规定可由用户调整元素的大小
  * `resize: none`：用户无法调整元素的尺寸
  * `resize: both`：用户可以调整元素的高度和宽度
  * `resize: horizontal`：用户可以调整元素的宽度
  * `resize: vertical`：用户可以调整元素的高度
3. 修改placeholder字体的样式，详见 https://www.cnblogs.com/jf-67/p/7241252.html?utm_source=tuicool&utm_medium=referral
  ```
  input::-webkit-input-placeholder{
    color:red;
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:red;
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:red;
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:red;
  }
  ```
4. `display: table-cell`可以用来实现两栏自适应布局，参考文章：https://www.zhangxinxu.com/wordpress/2010/10/%E6%88%91%E6%89%80%E7%9F%A5%E9%81%93%E7%9A%84%E5%87%A0%E7%A7%8Ddisplaytable-cell%E7%9A%84%E5%BA%94%E7%94%A8/
  * 本组件中的`prepend`前置元素、`append`后置元素与`input`的组合，就是借助`table-cell`来实现的两栏（都）自适应布局
