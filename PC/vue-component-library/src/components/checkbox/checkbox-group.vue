<template lang="html">
  <div class="xu-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
import Emitter from 'src/mixins/emitter.js'
export default {
  name: 'XuCheckboxGroup',
  componentName: 'XuCheckboxGroup',
  mixins: [Emitter],
  inject: {
    xuFormItem: {
      default: ''
    }
  },
  props: {
    value: {},
    disabled: Boolean,
    min: Number,
    max: Number,
    size: String,
    fill: String,
    textColor: String
  },
  computed: {
    _xuFormItemSize() {
      return (this.xuFormItem || {}).xuFormItemSize;
    },
    checkboxGroupSize() {
      return this.size || this.xuFormItemSize || (this.$ELEMENT || {}).size;
    }
  },
  watch: {
    value(val) {
      this.dispatch('XuFormItem', 'xu.form.change', [val]);
    }
  }
}
</script>

<style lang="css">
</style>
