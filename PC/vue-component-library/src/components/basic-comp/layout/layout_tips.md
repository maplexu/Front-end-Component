**总结：**
1. row组件宽度被分成24份，每份的宽度为4.16667%
2. col组件都设置 float: left，从而实现一行分布
  * **注意：** 当row组件选择 flex布局时，子col 都是inline-block，此时不需要浮动，也能一行排列
3. col组件使用 border-box 盒模型，配合自身设置padding-left / padding-right，实现各栅格等距分隔
  * **注意：**
    1. row 组件根据配置设置了 margin-left / margin-right
    1. col组件根据父row组件的来决定自己的padding-left / padding-right 值大小
    * 因此，最终看起来各栅格元素的左右间距都是相同的
4. col组件设置push，pull属性来实现左右移动
  * **实现原理：** 有push，pull属性时，组件元素 position: relative 布局，通过right、left来实现左、右移动
5. 对col组件添加xs、sm、md、lg、xl属性，从而添加对于的响应式样式

**备注：**
修改组件默认样式的方法：
1. 找到该组件根元素的选择器，修改该选择器的样式
2. 直接在使用组件时，给组件上添加 class、style，这两个部分的样式会自动添加到该组件的根元素上去
