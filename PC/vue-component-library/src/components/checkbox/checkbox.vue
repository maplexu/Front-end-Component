<template lang="html">
  <label
    :class="classList"
    role="checkbox"
    :aria-checked="indeterminate ? 'mixed' : 'isChecked'"
    :aria-disabled="isDisabled"
  >
    <!-- 自定义多选框的UI样式（隐藏原生的checkbox，使用其他元素来实现多选框的自定义UI） -->
    <span :class="classList2" aria-checked="mixed">
      <span class="xu-checkbox__inner"></span>
      <input v-if="trueLabel || falseLabel" type="checkbox" class="xu-checkbox__original" aria-hidden="true"
        :name="name" :disabled="isDisabled" :true-value="trueLabel" :false-value="falseLabel" v-model="model"
        @change="handleChange" @focus="focus = true" @blur="focus = false"
      />
      <input v-else type="checkbox" class="xu-checkbox__original" aria-hidden="true"
        :name="name" :disabled="isDisabled" :value="label" v-model="model"
        @change="handleChange" @focus="focus = true" @blur="focus = false"
      />
    </span>
    <!-- 自定义多选框的显示文字 -->
    <span class="xu-checkbox__label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
import Emitter from 'src/mixins/emitter.js';

export default {
  name: 'XuCheckbox',
  componentName: 'XuCheckbox',
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
    value: {},                          // 绑定 v-model 指令的值（单个复选框绑定到Boolean值）
    label: {},                          // 选中状态的值，只有在checkbox-group下有效
    indeterminate: Boolean,             // 设置indeterminate状态（全选/非全选状态）
    disabled: Boolean,
    checked: Boolean,                   // 当前是否勾选住
    name: String,
    trueLabel: [String, Number],        // 选中时显示的值
    falseLabel: [String, Number],       // 没有选中时显示的值
    // id: String,
    // controls: String,
    border: Boolean,
    size: String
  },
  data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false
    }
  },
  computed: {
    _xuFormItemSize() {
      return (this.xuFormItem || {}).xuFormItemSize;
    },
    isGroup() {
      // 多选按钮是否在按钮组下（如果在，查找到所在的该父checkboxGroup组件）
      let parent = this.$parent;
      while(parent) {
        if(parent.$options.componentName !== 'XuCheckboxGroup') {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },
    checkboxGroupValue() {
      // 计算得到的父 checkboxGroup 组件的v-model绑定值（该值是一个数组）
      return this.isGroup && this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },
    isDisabled() {
      // return this.isGroup ? this._checkboxGroup.disabled || this.disabled || (this.xuForm || {}).disabled : this.disabled || (this.xuForm || {}).disabled;
      //
      return this.disabled || (this.isGroup && this._checkboxGroup || {}).disabled || (this.xuForm || {}).disabled
    },
    checkboxSize() {
      // const temCheckboxSize = this.size || this._xuFormItemSize || (this.$ELEMENT || {}).size;
      // return this.isGroup ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize : temCheckboxSize;
      const temCheckboxSize = (this.isGroup && this._checkboxGroup || {}).checkboxGroupSize || this.size || this._xuFormItemSize || (this.$ELEMENT || {}).size;
      return temCheckboxSize;
    },
    isChecked() {
      // 计算当前的多选按钮是否是选中的状态
      if({}.toString.call(this.model) === '[object Boolean]') {
        // model为Boolean，checkbox单独存在的情况
        return this.model;
      } else if(Array.isArray(this.model)) {
        // model为Array，checkbox在checkboxGroup中
        return this.model.indexOf(this.label) > -1;
      } else if(this.model !== null && this.model !== undefined) {
        // model值为其他情况，且不为null和undefined，看该model的值是否等于预设的选中时的值
        return this.model === this.trueLabel;
      }
    },
    model: {
      // 给原生input[type=checkbox]的v-model上绑定的值
      get() {
        return this.isGroup
          ? this.checkboxGroupValue : this.value !== undefined
            ? this.value : this.selfModel;
      },
      set(val) {
        if(this.isGroup) {
          this.isLimitExceeded = false;
          // 判断当前多选按钮组中选中的数目是否超出了checkboxGroup组件设置的范围（此时的val是一个数组，是checkboxGroup传过来的）
          // 若对单选按钮的操作在数目范围内，则允许操作（修改checkboxGroup的value，然后当前checkbox组件再根据checkboxGroup的value计算当前的model值），否则就不允许操作
          (this._checkboxGroup.min !== undefined && val.length < this._checkboxGroup.min && (this.isLimitExceeded = true));
          (this._checkboxGroup.max !== undefined && val.length > this._checkboxGroup.max && (this.isLimitExceeded = true));

          this.isLimitExceeded === false && this.dispatch('XuCheckboxGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
          this.selfModel = val;
        }
      }
    },
    classList() {
      let classList = ['xu-checkbox'];

      if(this.border && this.checkboxSize) classList.push(`xu-checkbox-${checkboxSize}`);
      if(this.isDisabled) classList.push('is-disabled');
      if(this.border) classList.push('is-bordered');
      if(this.isChecked) classList.push('is-checked');

      return classList;
    },
    classList2() {
      let classList = ['xu-checkbox__input'];

      if(this.isDisabled) classList.push('is-disabled');
      if(this.isChecked) classList.push('is-checked');
      if(this.indeterminate) classList.push('is-indeterminate');
      if(this.focus) classList.push('is-focus');

      return classList;
    }
  },
  methods: {
    handleChange(e) {
      if(this.isLimitExceeded) return;
      let value;
      if(e.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel;
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel;
      }
      this.$emit('change', value, e);
      this.$nextTick(() => {
        if(this.isGroup) {
          this.dispatch('XuCheckboxGroup', 'change', [this._checkboxGroup.value]);
        }
      })
    },
    addToStore() {
      if(Array.isArray(this.model) && this.model.indexOf(this.value) === -1) {
        this.model.push(this.label);
      } else {
        this.model = this.trueLabel || true;
      }
    }
  },
  created() {
    this.checked && this.addToStore();
  },
  watch: {
    value(val) {
      this.dispatch('XuFormItem', 'el.form.change', val);
    }
  }
}
</script>

<style lang="css">
</style>
