<template lang="html">
  <label
    :class="classList"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <!-- 自定义单选按钮的UI样式（隐藏原生的radio，使用其他元素来实现单选按钮的自定义UI） -->
    <span :class="['xu-radio__input', {'is-disabled': isDisabled}, {'is-checked': model === label}]">
      <span class="xu-radio__inner"></span>
      <input
        type="radio"
        class="xu-radio__original"
        :name="name"
        :value="label"
        v-model="model"
        :disabled="isDisabled"
        tabindex="-1"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
      />
    </span>
    <!-- 自定义单选按钮的显示文字 -->
    <span class="xu-radio__label" @keydown.stop>
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
import Emitter from 'src/mixins/emitter.js';

export default {
  name: 'XuRadio',
  componentName: 'XuRadio',
  mixins: [Emitter],
  inject: {
    xuForm: {
      default: ''
    },
    xuFormItem: {
      default: ''
    }
  },
  props: {
    value: {},                      // 模拟在该组件使用 v-model指令 绑定的值
    label: {},                      // 该单选按钮的值
    disabled: {                     // 是否禁用
      type: Boolean,
      default: false
    },
    border: {                       // 是否显示边框
      type: Boolean,
      default: false
    },
    size: String,                   // 尺寸（仅在该组件有border时，尺寸才有效）
    name: String                    // name
  },
  data() {
    return {
      focus: false
    }
  },
  computed: {
    isGroup() {                   // 按钮是否在按钮组下
      let parent = this.$parent;
      while(parent) {
        if(parent.$options.componentName !== 'XuRadioGroup') {
          parent = parent.$parent;
        } else {
          this._radioGroup = parent;
          return true;
        }
      }
      return false;
    },
    radioSize() {               // 计算按钮的大小
      const temRadioSize = this.size || this._xuFormItemSize || (this.$ELEMENT || {}).size;
      return this.isGroup ? this._radioGroup.radioGroupSize || temRadioSize : temRadioSize
    },
    isDisabled() {              // 计算该按钮是否禁用
      return this.isGroup ? this._radioGroup.disabled || this.disabled || (this.xuForm || {}).disabled : this.disabled || (this.xuForm || {}).disabled;
    },
    _xuFormItemSize() {         // 计算FormItem组件设置的大小
      return (this.xuFormItem || {}).elFormItemSize;
    },
    tabIndex() {
      return (this.isDisabled || (this.isGroup && this.model !== this.label)) ? -1 : 0;
    },
    classList() {
      let classList = ['xu-radio'];

      if(this.border && this.radioSize) classList.push(`xu-radio-${radioSize}`);
      if(this.isDisabled) classList.push('is-disabled');
      if(this.focus) classList.push('is-focus');
      if(this.border) classList.push('is-bordered');
      if(this.model === this.label) classList.push('is-checked');

      return classList;
    },
    model: {
      // 用于绑定到原生 input[type=radio]的v-model上的值
      get() {
        return this.isGroup ? this._radioGroup.value : this.value;
      },
      set(val) {
        if(this.isGroup) {
          this.dispatch('XuRadioGroup', 'input', [val]);              // 通知<radio-group>组件触发 input 事件，从而改变绑定在<radio-group>组件的v-model上的值
        } else {
          this.$emit('input', val);                                   // 触发自己的 input 事件，从而改变绑定在该<radio>组件的v-model上的值
        }
      }
    }
  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.$emit('change', this.model);
        this.isGroup && this.dispatch('XuRadioGroup', 'handleChange', this.model);
      })
    }
  }
}
</script>

<style lang="css">
</style>
