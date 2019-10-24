**总结：**
1. 按钮的大小都是由自己的`padding`值撑开的，组件选择不同的`size`，就为按钮选择不同`padding`大小的样式类
2. 按钮在操作时的颜色变化过程：
  * 初识是正常的颜色——颜色1
  * 鼠标移动到按钮上时(`hover`)，按钮背景色稍微变淡——颜色2
  * 鼠标在按钮上，鼠标按下(`hover`->`active`)，按钮背景色再稍微变深——颜色3
  * 鼠标在按钮上，鼠标按键抬起(`active`->`hover`)，按钮背景色又变成`hover`时的颜色——颜色3
  * 鼠标离开按钮上，按钮颜色恢复正常——颜色1

**学习知识点：**
1. css样式：
  * `pointer-events`：让该元素虚化，鼠标事件（点击、hover、...）对该元素失效，直接透过该元素
    * 常见使用场景：
      1. 给一段文字上面添加一个遮罩层元素，直接点击遮罩层是无法选中文字的，设置`pointer-events: none`，即可穿透遮罩层来拷贝文字了
      * **注意：** 添加`pointer-events: none`样式，鼠标事件将透过该元素及其下面的子元素，若只希望鼠标事件透过该元素，而不透过该元素下面的子元素，可以再为子元素添加`pointer-events: all`
      ```
      <div class="father"><div class="child"></div></div>

      .father {width: 200px; height: 200px; pointer-events: none;}
      .child {width: 100%; heightL 100px; pointer-events: all;}
      ```
  * `-webkit/-moz/-ms-user-selct`：是否可选中该元素中的文字，设置为`none`表示不允许选中
2. 给一个元素添加遮罩层的方法：
  1. 方法1: 添加一个子元素，子元素`absolute`定位，宽高等于该元素的高度
  2. 方法2: 通过该元素的`:before`伪元素来实现上述效果
```
.xu-button.is-loading {
  position: relative;
  pointer-events: none;          // 让该元素实体虚化，鼠标事件（点击、hover、...）对该元素失效
}
// 下面样式的作用，是在按钮loading的时候，给按钮添加一个半透明的遮罩层效果
.xu-button.is-loading:before {
  pointer-events: none;
  content: '';
  position: absolute;
  left: -1px;
  top: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: inherit;
  background-color: rgba(255, 255, 255, .35);
}
```
