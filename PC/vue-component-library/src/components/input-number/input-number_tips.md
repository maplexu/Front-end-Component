**总结：**
1. js浮点数运算精度问题：
  * **问题描述：**
    * 因为在JS中整数和浮点数都是`Number`数据类型
    * 因此在进行数值计算的时候，若其中含有浮点数，则经常会出现一些问题，如下所示：
  * **问题示例：** `0.3 - 0.2 = 0.09999999999999998; 0.1 + 0.2 = 0.30000000000000004`
  * **解决方法：**
    1. 例如，现在有两个数 `num1` 和 `num2` 要进行运算
    2. 首先计算`num1` 和 `num2` 这两个数的小数点位数，从中取最长的，命名位`precision`
    3. 计算出`10`的`precision`次幂，命名为`precisionFactor`
    4. 在进行数值计算时，各值先乘上`precisionFactor`，最后的结果再除以`precision`
    ```
    let num1 = 0.234, num2 = 0.3;
    let precisionFactor = Math.pow(10, 3);

    function decrease(num1, num2) {
      return (num1*precisionFactor - num2*precisionFactor) / precisionFactor;
    }  
    ```
2. 对dom元素的class获取和操作：
  1. `element.className`：字符串，返回的是元素上面的class，
    * 例如：使用`element.className`，可返回`class1 class2`
  2. `element.classList`：特殊结构列表，对element.className的字符串进行空格分割后的集合列表
    注意：
      1. classList提供了多种操作方法
        * `clsssList.item(1)`——获取该集合中索引为1的类型;
        * `clsssList.add('cls1')`——添加类
        * `clsssList.remove('cls1')`——删除类
        * `clsssList.contains('cls1')`——判断是否包含类
        * `clsssList.toggle('cls1')`——有则删除，无则添加
      2. classList的兼容性问题
        * 是新的标准（H5出现的），各浏览器对它的支持差别较大，IE中IE10之后才支持，可以通过hack手段来解决这一问题

3. 获取元素的样式：
  1. 获取元素的行间（内联）样式：`el.style[styleName]`
  2. 获取元素的非行间样式：
    1. 低版本IE（<9）：`el.currentStyle[styleName]``
    2. 其他：`window.getComputedStyle(el, null)[styleName]`，等价于`document.defaultView.getComputedStyle(elem1, null)`;

4. 该组件中定义了两个变量：
  1. `currentValue`：用于记录计数器当前的值
  2. `userInput`：用于统计用户使用计数器的输入框的结果：
    * 输入框的`input`事件中，`userInput`的值就是输入的值
    * 输入框的`change`事件中，`userInput`的值需要判断输入的内容是否是数字，不是数字，输入框的内容会被替换成上一次输入的数字，详见代码的的`input`、`change`两个事件处理
      * 若用户输入的是数字，则`userInput`的值就是该输入的数字，那么绑定到输入框上面的计算属性值就根据`userInput`来计算
      * 若用户输入的不是数字，则`userInput`的值为null，那么绑定到输入框上面的计算属性值就根据`currentValue`来计算

5. 默认的`watch`监听`prop`的变化，第一次组件实例化创建的时候不会监听到，只会在后续传入`prop`值变化时监听到，若想在一开始，`prop`的值传入的时候就监听到，需要使用如下写法：
```
watch: {
  a(val, oldVal) {
    console.log(val)
  },
  b: {
    immediate: true,
    handler: function(val, oldVal) {      // 该回调函数会在侦听开始之后立即被调用
      //...
    }
  }
}
```
