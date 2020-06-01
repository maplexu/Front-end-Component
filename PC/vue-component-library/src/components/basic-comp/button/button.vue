<template lang="html">
  <button
    :class="classList"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <i class="xu-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: 'xuButton',
  inject: {                     // inject用于接收一个祖先组件给后台注入的依赖
    xuForm: {
      default: ''
    },
    xuFormItem: {
      default: ''
    }
  },
  props: {
    type: {                       // 按钮的类型（primary/success/warning/danger/info/texts）
      type: String,
      default: 'default'
    },
    size: String,                 // 按钮的尺寸（medium/small/mini）
    icon: {                       // 按钮使用的图标的类名
      type: String,
      default: ''
    },
    nativeType: {                 // button按钮的原生type属性（button/submit/reset）
      type: String,
      default: 'button'
    },
    loading: Boolean,             // 按钮是否加载中
    disabled: Boolean,            // 按钮是否禁用状态
    plain: Boolean,               // 是否朴素按钮
    ghost: Boolean,               // 是否为幽灵按钮
    autofocus: Boolean,           // 是否默认聚焦
    round: Boolean,               // 是否圆角按钮
    circle: Boolean               // 是否圆形按钮
  },
  computed: {
    classList() {
      let classList = ['xu-button'];

      if (this.type) classList.push(`xu-button--${this.type}`);
      if (this.buttonSize) classList.push(`xu-button--${this.buttonSize}`);
      if (this.buttonDisabled) classList.push('is-disabled');
      if (this.loading) classList.push('is-loading');
      if (this.plain) classList.push('is-plain');
      if (this.ghost) classList.push('is-ghost');
      if (this.round) classList.push('is-round');
      if (this.circle) classList.push('is-circle');

      return classList;
    },
    _xuFormItemSize() {
      return (this.xuFormItem || {}).xuFormItemSize;
    },
    buttonSize() {
      return this.size || this._xuFormItemSize || (this.$ELEMENT || {}).size
    },
    buttonDisabled() {
      return this.disabled || (this.xuForm || {}).disabled
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<style lang="css">
</style>
