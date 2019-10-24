**总结：**
1. 组件的`v-model`指令通过如下方式来模拟实现(具体参考文档：https://cn.vuejs.org/v2/guide/components.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-v-model)：
  1. 给组件的`prop`上绑定一个`value`
  2. 组件内部触发`input`事件时，输入的新值通过自定义的`input`事件抛出
  ```
  <input v-model="searchText">
  // 等效于
  <input v-bind:value="searchText" v-on:input="searchText = $event.target.value">

  <custom-input :value="searchText" @input="searchText = $event"></custom-input>
  // 等效于
  <custom-input v-model="searchText"></custom-input>
  ```
  > **备注：** 模拟`v-model`的默认属性和事件是`value`和`input`事件，当然这两个也可以配置成其他的，详见`model`的配置
  * **正常的自定义组件v-mdoel指令配合组件内部数据操作过程：**
    1. 组件上面使用`v-model`指令，传入数据
    2. 组件内部使用`prop:value`获取到传入的数据，并可借助计算属性，将数据值传给一个变量`computedValue`
    3. 将`computedValue`值绑定到原生的原生表单元素上，有两种方式：
      1. `v-model="computedValue"`绑定到原生表单元素上
        * 该方式的`computedValue`需要设置`setter`，在表单操作`computedValue`的值发生变化后，通过`this.$emit('input', val)`通知到上层。从而实现组件的双向数据绑定
      2. `:value="computedValue" @input="handleInput"`绑定到原生表单元素上
        * 更加底层一点的写法，其实目的和第一步一样，在`handleInput`事件函数中通过`this.$emit('input', val)`通知到上层
        * 唯一一点不同在于：
          * 这种方式的`computedValue`的值不会在表单操作后立即修改，因为它这里的`input`事件函数不是直接来重新对`computedValue`赋值
          * `computedValue`值会在自定义组件监听到`input`事件并修改自定义组件的`value`之后，组件北部重新计算`value`得到新的`computedValue`值

2. 对这种原生form元素改造的form组件的核心：
  1. 原生form元素存在，但不可见（通过css来隐藏原生的form原生，例如设置opacity:0/width，height设置为0/z-index层级设置低），使用其他元素来模拟实现自定义form控件的UI表现
  2. 用`<label>`元素包裹组件所有的内容（包括原生form元素和模拟自定义form控件的元素）
    * 这是`<label>`会自动绑定到该原生form元素上来，点击`<label>`，也会触发点击该原生form元素
  3. 原生form元素不可见，但是所有的操作逻辑都需要通过这些原生form元素来完成，因为需要借助这些原生的form元素的特性和行为
    * input[type]元素都可以通过`v-model`指令来双向绑定数据
    * 并且input[type]元素都可响应鼠标点击事件，切换自身状态或进行其他的操作
      * 例如，input[type=checkbox]元素可以记录选中或不选中的状态，可通过鼠标点击切换input[type=checkbox]元素的状态
      * 例如，借助input[type=file]元素可选择文件对象的特性...

3. 自定义表单样式写法的核心：（详见各组件的写法）
  1. 最外层容器元素：基础样式类 + 状态样式类（`禁用状态、有某个插槽被插进来、...`）+ 尺寸样式类
    * 状态样式类：用于实现在不同状态下，控制表单元素和其他元素的样式表现
  2. 内层元素包括：
    1. 原生表单元素
    2. 模拟表单元素效果的元素或其他辅助元素
    3. 插槽元素

4. 组件在父组件中时，可被父组件的状态控制，例如：
  1. `<radio>`在`<radio-group>`组件下使用时，`<radio>`的禁用状态受自己的组件属性--`disabled`和父级`<radio-group>`的组件属性--`disabled`共同控制
  ```
  export default {
    props: {
      disabled: boolean
    }
    computed: {
      // 获取父radio-group组件实例
      radioGroup() {
        let parent = this.$parent;
        while(parent) {
          if(parent.$options.componentName !== 'XuRadioGroup') {
            parent = parent.$parent;
          } else {
            return parent;
          }
        }
        return false;
      },
      isDisabled() {
        return this.disabled || (this.radioGroup || {}).disabled
      }
    }
  }
  ```



**学习知识：**
1. HTMlL5中标签元素的`role`和`aria-*`属性：
  * `role`：描述一个标签的具体功能，比如说你的网站设计时没有考虑无障碍应用，可能正常人看着网站没有任何问题，可是盲眼人士使用屏幕阅读器看你网站可能就不容易看懂了
  * `aria-*`：描述这个tag在可视化的情境中的具体信息（也是为无障碍应用设计的）
  > 示例：`<div role="checkbox" aria-checked="checked" > </div >`：辅助工具就会知道这个div实际上是个checkbox的角色，为选中状态

2. html标签的tabIndex属性：
  * 将该html控件的tabIndex属性设置为`1`到`32767`中的一个值，就可以将这个控件加入到TAB键的序列中
  * 当浏览者使用TAB键在网页控件中移动时，将首先移动到具有最小tabIndex属性值的控件上，最后在具有最大tabIndex属性值的控件上结束移动
  * **注意**：
    1. 默认的tabIndex属性为`0`，将排列在所有指定了tabIndex属性的控件之后
    2. 而若把tabIndex属性设为一个负值（如tabIndex="-1"），那么这个链接将被排除在TAB键的序列之外

3. `<label>`元素的两种绑定方式

4. css复合选择器的使用（很强大、扩展性很强）
  * 交集，例如：`.name1.name2 {....}`，则元素必须同时有`name1`和`name2`类，这个样式才生效
  * 并集
  * 后代
  * 子元素
  * 相邻兄弟元素：`+`
  * 所有兄弟元素选择器：`~`
  * 属性选择器：[属性名=xxx]

5. vue中使用`mixins`，可向组件中混入一些可复用的组件选项

6. vue中使用 `provide / inject` ，祖先组件可给后代注入一个依赖：
  1. `provide`：祖先组件使用，放入要注入给后代的属性
  2. `inject`：后代组件使用，可获取祖先组件注入的属性内容
