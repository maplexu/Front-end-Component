**总结：**
1. 对这种原生form元素改造的form组件的核心：
  * 详见radio章节的总结
2. 多选按钮的`indetermiante`状态解析和总结
  * `indeterminate`状态分析：
    * 普通的多选按钮有两个状态：
      * 选中：多选框中显示 `勾`————————`<checkbox>`组件的`v-model`值或父`<checkbox-group>`组件的`v-model`值表示该按钮选中
      * 不选中：多选框中不显示内容————————`<checkbox>`组件的`v-model`值或父`<checkbox-group>`组件的`v-model`值表示该按钮未选中
    * 带`indeterminate`的多选按钮有三个状态：
      * 选中：多选框中显示 `勾`————————`<checkbox>`组件的`v-model`的`v-model`值为`true`
      * 不选中，且为`indeterminate`状态：多选框中显示 `横线`————————`<checkbox>`组件的`v-model`的`v-model`值表示该按钮未选中，同时组件的`indeterminate`属性为`true`
      * 不选中，且不为`indeterminate`的状态：多选框中不显示内容——————————`<checkbox>`组件的`v-model`的`v-model`值为`false`，同时组件的`indeterminate`属性为`false`
    > 注意：
    > * `indeterminate`状态只是用来控制当前按钮的状态，，一般用在全选按钮上，
    > * `indeterminate`只表示这个全选按钮的显示状态，跟如何操作全选 / 全不选 的逻辑没有太大关系（具体实现还要依靠change事件处理，自己写逻辑去控制）；它只会在按钮组中的状态发生变化时，`indeterminate`响应变化从而实现全选按钮状态的变化，详见案例的使用
  * 自定义`checkbox`的`indeterminate`和`checked`状态实现方法：——————借助`::before`和`::after`伪元素来实现
    * `cxheckbox`是`indeterminate`状态，即给元素添加`is-indeterminate`样式类，
    * `cxheckbox`是`checked`状态，即给元素添加`is-checked`样式类
    ```
    // indeterminate状态，checkbox里面显示的是一个蓝色的横线
    .xu-checkbox__input.is-indeterminate .xu-checkbox__inner::before {
      content: '';
      position: absolute;
      display: block;
      background-color: #fff;
      height: 2px;
      transform: scale(0.5);
      -webkit-transform: scale(0.5);
      left: 0;
      right: 0;
      top: 5px;
    }
    // indeterminate状态隐藏checked状态的效果
    .xu-checkbox__input.is-indeterminate .xu-checkbox::after {
      display: none;
    }
    ```
