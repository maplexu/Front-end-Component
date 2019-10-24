<!-- 注意：radio-button只能用在radio-group下面，<radio-button>组件上面不能使用v-model指令，必须从<radio-group>的v-model指令上操作值 -->

<template lang="html">
  <label
    role="radio"
    :aria-checked="value === label"
    :aria-disabled="isDisabled"
    :tabIndex="tabIndex"
    :class="classList"
    @keydown.space.stop.prevent="value = isDisabled ? value : label"
  >
    <input
      type="radio"
      class="xu-radio-button__orig-radio"
      tabIndex="-1"
      :value="label"
      :name="name"
      :disabled="isDisabled"
      @change="handleChange"
      @focus="focus = true"
      @blur="focus = false"
      v-model="value"
    >
    <span class="xu-radio-button__inner" :style="value === label ? activeStyle : ''" @keydown.stop>
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
import Emitter from 'src/mixins/emitter.js';

export default {
  name: 'XuRadioButton',
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
    label: {},
    disabled: Boolean,
    name: String
  },
  data() {
    return {
      focus: false
    }
  },
  computed: {
    _xuradioGroup() {
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
    value: {
      get() {
        return this._xuradioGroup.value
      },
      set(value) {
        this._xuradioGroup.$emit('input', value);
      }
    },
    activeStyle() {
      return {
        backgroundColor: this._xuradioGroup.fill || '',
        borderColor: this._xuradioGroup.fill || '',
        boxShadow: this._xuradioGroup.fill ? `-1px 0 0 0 ${this._xuradioGroup.fill}` : '',
        color: this._xuradioGroup.textColor || ''
      }
    },
    _xuFormItemSize() {
      return (this.xuFormItem || {}).xuFormItemSize;
    },
    size() {
      return this._xuradioGroup.radioGroupSize || this._xuFormItemSize || (this.$ELEMENT || {}).size;
    },
    isDisabled() {
      return this.disabled || this._xuradioGroup.isDisabled || (this.xuForm || {}).disabled;
    },
    tabIndex() {
      return (this.isDisabled || (this._xuradioGroup && this.value !== this.label)) ? -1 : 0;
    },
    classList() {
      let classList = ['xu-radio-button'];

      if(this.size) classList.push(`xu-radio-button-${this.size}`);
      if(this.value == this.label) classList.push(`is-active`);
      if(this.isDisabled) classList.push('is-disabled');
      if(this.focus) classList.push('is-focus');

      return classList;
    }
  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.dispatch('XuRadioGroup', 'handleChange', this.value);
      })
    }
  }
}
</script>

<style lang="css">
</style>
