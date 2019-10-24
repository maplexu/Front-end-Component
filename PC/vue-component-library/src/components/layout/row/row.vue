<template lang="html">
  <!-- <div :class="[xu-row,
    justify !=='start' ? 'is-justify-' + justify : '',
    align !== 'top' ? 'is-align-' + align : '',
    {'xu-row--flex': type === 'flex'}
    ]"
  :style="style"
  >
    <slot></slot>
  </div> -->
  <div :class="classList" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'XuRow',
  componentName: 'XuRow',
  props: {
    tag: {              // 定义该row组件使用什么标签（在使用渲染函数时会用到）
      type: String,
      default: 'div'
    },
    gutter: Number,     // 栅格间隔
    type: String,       // 布局的模式，可选择flex
    justify: {          // flex布局下的水平排列方式
      type: String,
      default: 'start'
    },
    align: {            // flex布局下的垂直排列方式
      type: String,
      default: 'top'
    }
  },
  computed: {
    style() {
      let style = {};

      if(this.gutter) {
        style.marginLeft = this.gutter / 2 + 'px';
        style.marginRight = style.marginLeft;
      }
      return style;
    },
    classList() {
      // 根据组件传入的 justify、align、type 这几个属性的情况，来给组件添加样式类
      let classList = [];
      classList.push('xu-row');
      if(this.type == 'flex') {
        classList.push('xu-row--flex');
      }
      if(this.justify !== 'start') {
        classList.push(`is-justify-${this.justify}`);
      }
      if(this.align !== 'top') {
        classList.push(`is-align-${this.align}`);
      }

      return classList;
    }
  }
}
</script>

<style lang="css">
</style>
