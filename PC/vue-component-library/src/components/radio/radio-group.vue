<template lang="html">
  <div class="xu-radio-group" role="radiogroup" @keydown="handleKeydown">
    <slot></slot>
  </div>
</template>

<script>
import Emitter from 'src/mixins/emitter.js'

const keyCode = Object.freeze({
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
})
export default {
  name: 'XuRadioGroup',
  componentName: 'XuRadioGroup',
  mixins: [Emitter],
  inject: {
    xuFormItem: {
      default: ''
    }
  },
  created() {
    this.$on('handleChange', value => {
      this.$emit('change', value);
    })
  },
  mounted() {
    // 当radioGroup没有默认选项时，第一个radio可以选中tab导航
    const radios = this.$el.querySelectorAll('[type=radio]');
    const firstLabel = this.$el.querySelectorAll('[role=radio]')[0];
    if(![].some.call(radios, radio => radio.checked) && firstLabel) {
      firstLabel.tabIndex = 0;
    }
  },
  props: {
    value: {},                    // 模拟在该组件使用 v-model指令 绑定的值
    size: String,                 // 单选按钮框组的尺寸
    fill: String,                 // 按钮形式的Radio激活时的填充色和边框色
    textColor: String,            // 按钮形式的Radio激活时的文本暖色
    disabled: Boolean             // 是否禁用该按钮组
  },
  computed: {
    _xuFormItemSize(){
      return (this.xuFormItem || {}).xuFormItemSIze;
    },
    radioGroupSize() {
      return this.size || this._xuFormItemSize || (this.$ELEMENT || {}).size;
    }
  },
  watch: {
    value(value) {
      this.dispatch('XuRadioItem', 'el.form.change', [this.value]);
    }
  },
  methods: {
    handleKeydown(e) {          // 上下左右按键，可以在radio组内切换不同的radio选项
      e.stopPropagation();
      e.preventDefault();

      const target = e.target;
      const className = target.nodeName === 'INPUT' ? '[type=radio]' : '[role=radio]';
      const radios = this.$el.querySelectorAll(className);
      const length = radios.length;
      const index = [].indexOf.call(radios, target);
      const roleRadios = this.$el.querySelectorAll('[role=radio]');

      switch (e.keyCode) {
        // 键盘按下左键和向上键
        case keyCode.LEFT:
        case keyCode.UP:
          if(index === 0) {
            roleRadios[length - 1].click();
            roleRadios[length - 1].focus();
          } else {
            roleRadios[index - 1].click();
            roleRadios[index - 1].focus();
          }
          break;
        // 键盘按下右键和向下键
        case keyCode.RIGHT:
        case keyCode.DOWN:
          if(index === (length - 1)) {
            roleRadios[0].click();
            roleRadios[0].focus();
          } else {
            roleRadios[index + 1].click();
            roleRadios[index + 1].focus();
          }
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style lang="css">
</style>
