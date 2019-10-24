export default {
  name: 'XuCol',
  props: {
    span: {                  // 定义栅格占据的列数
      type: Number,
      default: 24
    },
    tag: {                  // 定义栅格使用什么标签（渲染函数方式有效）
      type: String,
      default: 'div'
    },
    offset: Number,         // 栅栏左侧的间隔数
    pull: Number,           // 栅栏向左移动的格数
    push: Number,           // 栅栏向右移动的格数
    xs: [Number, Object],   // < 768px栅栏的属性（对象）
    sm: [Number, Object],   // >= 768px栅栏的属性（对象）
    md: [Number, Object],   // >= 992px栅栏的属性（对象）
    lg: [Number, Object],   // >= 1200px栅栏的属性（对象）
    xl: [Number, Object]    // >= 1920px栅栏的属性（对象）
  },
  computed: {
    gutter(){
      // 根据上级 XuRow 组件的 gutter 属性，决定该 XuCol 组件左右两边是否有间隔
      let parent = this.$parent;

      while(parent && parent.$options.componentName !== 'XuRow') {
        parent = parent.$parent;
      }
      return parent ? parent.gutter : 0;
    },
    render(h) {
      let classList = [];
      let style = {};

      if(this.gutter) {
        style.paddingLeft = this.gutter / 2 + 'px';
        style.paddingRight = style.paddingLeft;
      }
      // 根据组件传入 span、offset、pull、push 这四个属性的情况，来给该组件添加样式类
      ['span', 'offset', 'pull', 'push'].forEach(prop => {
        if(this[prop] || this[prop] === 0) {
          classList.push(prop !== 'span' ? `xu-col-${prop}-${this[prop]}` : `xu-col-${this[prop]}`);
        }
      })

      // 根据组件传入 xs、sm、md、lg、xl 这几个属性的情况，来给该组件添加样式类
      ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
        if(typeof this[size] === 'number') {
          // xs、sm、md、lg、xl传入的是一个数值（数值默认设置的是span——该元素占据的列数）
          classList.push(`xu-col-${size}-${this[size]}`);
        } else if(typeof this[size] === 'object') {
          // xs、sm、md、lg、xl传入的是一个对象
          let props = this[size];
          Object.keys(props).forEach(prop => {
            classList.push(prop !== 'span' ? `xu-col-${size}-${prop}-${props[prop]}` : `xu-col-${size}-${props[prop]}`);
          })
        }
      })

      return h(this.tag, {
        class: ['xu-col', classList],
        style
      }, this.$slots.default)
    }
  }
}
