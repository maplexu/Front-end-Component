# 1.`BEM`命名混合器写法注意点：
### 1.`b`混合器写法：
* 写法很简单，如下所示：
  1. 将`命名空间`和传入的`块`名组合出新的选择器名
  2. 将混合器使用时传入的样式内容放到`@content`的位置

### 2.`e`混合器写法：
* 有一些使用注意点：
  1. `hitAllSpecialNestRule`函数进行判断的作用：
    * 判断父级选择器中是否有`--`（修饰符）、`:`（伪类）、`is`（flag类），如果
      * 有：将生成的 `块` 选择器 挂载到 `父` 选择器下面，然后父选择器设置为根选择器
      * 没有：直接将生成的 `块` 设置为根选择器
    * 上述判断的实际意义：
      * 在实际的开发中，选择器中包含`修饰符`、`伪类`、`is`的都是表示一些特殊的状态，例如`.el-button__disabled`、`.isActive`、`el-button:hover`，这些特殊的状态是需要影响到子元素的，因此希望生成的 `元素`选择器 必须处在 父选择器 下
      * 其他的情况，`元素`选择器就没有上述限制了，可以直接放到根节点下
    * 示例：
      ```scss
      .container {
          @include b('button') {
              width: 200px;
              height: 200px;
              @include e('body') {
                  color: #ccc;
              }
          }
      }
      .container:hover {
          @include b('button') {
              width: 200px;
              height: 200px;
              @include e('body') {
                  color: #000;
              }
          }
      }

      // 编译为：
      .container .el-button {
        width: 200px;
        height: 200px;
      }
      .el-button__body {
        color: #ccc;
      }
      .container:hover .el-button {
        width: 200px;
        height: 200px;
      }
      .container:hover .el-button .el-button__body {
        color: #000;
      }
      ```

### 3.`m`混合器写法：
* 注意点：
  1. `e`混合器和`m`混合器拼接自己的选择器时的区别：
    * `e`混合器：`$currentSelector: #{$currentSelector + "." + $B + $element-separator + $unit + ","}`
      * 使用`$B`来拼接：因为`e`(元素)只能拼接在`b`(块)的后面
    * `m`混合器：`$currentSelector: #{$currentSelector + & + $modifier-separator + $unit + ","}`
      * 使用`&`来拼接：`m`(修饰符)可以直接拼接在父级选择器的后面，同时`&`如果是嵌套在多层父选择器下的话，会将最外层的父级选择器一级一级的传递进来
  > 个人总结：感觉`e`混合器中使用`$B`来拼接主要就是为了处理上面`hitAllSpecialNestRule`函数判断处理逻辑，直接将生成的元素选择器丢到全局去