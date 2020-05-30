<template lang="html">
  <div :class="classList" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <!-- 1.输入框的类型不是textarea类型的 -->
    <template v-if="type !== 'textarea'">
      <!-- 1.1 前置内容 -->
      <div v-if="$slots.prepend" class="xu-input-group__prepend">
        <slot name="prepend"></slot>
      </div>

      <!-- 1.2 原生的input元素，用来处理该自定义输入框组件的输入和显示行为 -->
      <input v-if="type !== 'textarea'" class="xu-input__inner" ref="input"
        v-bind="$attrs" :value="nativeInputValue" :tabindex="tabindex" :type="type"
        :disabled="inputDisabled" :readonly="readonly" :autocomplete="autocomplete" :arial-label="label"
        @compositionstart="handleComposition" @compositionupdate="handleComposition" @compositionend="handleComposition"
        @input="handleInput" @focus="handleFocus" @blur="handleBlur" @change="handleChange"
      />

      <!-- 1.3 前置（图标）元素 -->
      <span v-if="$slots.prefix || prefixIcon" class="xu-input__prefix">
        <slot name="prefix"></slot>
        <i v-if="prefixIcon" class="xu-input__icon" :class="prefixIcon"></i>
      </span>
      <!-- 1.4 后置（图标）元素 -->
      <span v-if="$slots.suffix || suffixIcon || showClear || validateState && needStatusIcon" class="xu-input__suffix">
        <span class="xu-input__suffix-inner">
          <template v-if="!showClear">
            <slot name="suffix"></slot>
            <i v-if="suffixIcon" class="xu-input__icon" :class="suffixIcon"></i>
          </template>
          <i v-else class="xu-input__icon xu-icon-circle-close xu-input__clear" @click="clear"></i>
        </span>
        <i v-if="validateState" class="xu-input__icon" :class="['xu-input__validateIcon', validateIcon]"></i>
      </span>
      <!-- 1.5 后置内容 -->
      <div v-if="$slots.append" class="xu-input-group__append">
        <slot name="append"></slot>
      </div>
    </template>


    <!-- 2.输入框的类型是textarea类型的 -->
    <textarea v-else class="xu-textarea__inner" ref="textarea"
      v-bind="$attrs" :value="nativeInputValue" :style="textareaStyle" :tabindex="tabindex"
      :disabled="inputDisabled" :readonly="readonly" :autocomplete="autocomplete" :arial-label="label"
      @compositionstart="handleComposition" @compositionupdate="handleComposition" @compositionend="handleComposition"
      @input="handleInput" @focus="handleFocus" @blur="handleBlur" @change="handleChange"
    ></textarea>
  </div>
</template>

<script>
import Emitter from 'src/mixins/emitter.js';
import Migrating from 'src/mixins/migrating.js';
import calcTextareaHeight from './calcTextareaHeight.js';
import merge from 'src/utils/merge.js';

export default {
  name: 'XuInput',
  componentName: 'XuInput',
  inject: {
    xuForm: {
      default: ''
    },
    xuFormItem: {
      default: ''
    }
  },
  mixins: [Emitter, Migrating],
  inheritAttrs: false,
  data() {
    return {
      textareaCalcStyle: {},
      hovering: false,                  // 检测当前的鼠标是否在该自定义的输入框组件上面（鼠标移入，该值变为true;鼠标移出，改值变为false）
      focused: false,
      isOnComposition: false
    }
  },
  props: {
    value: [String, Number],            // 输入框组件使用v-model指令时的绑定值
    size: String,                       // 输入框尺寸，只在 type=textarea 时有效
    resize: String,                     // 控制能否被用户缩放
    form: String,                       // 该输入框所属哪一个表单（原生属性）
    disabled: Boolean,                  // 禁用
    readonly: Boolean,                  // 是否只读（原生属性）
    type: {                             // 文本框的类型，可以是text（默认）、textarea
      type: String,
      default: 'text'
    },
    autosize: {                         // 自适应内容高度，只对 type=textarea 有效，可传入Boolean，或可传入对象，如{minRows: 2, maxRows: 6}
      type: [Boolean, Object],
      default: false
    },
    autocomplete: {                     // 自动补全（原生属性）
      type: String,
      default: 'off'
    },
    validateEvent: {                    // 输入时是否触发表单的校验
      type: Boolean,
      default: true
    },
    suffixIcon: String,                 // 输入框尾部图标
    prefixIcon: String,                 // 输入框头部图标
    label: String,                      // 输入框关联的label文字
    clearable: {                        // 是否可清空
      type: Boolean,
      default: false
    },
    tabindex: String                    // 输入框的tabindex
  },
  computed: {
    _xuFormItemSize() {
      return (this.xuFormItem || {}).xuFormItemSize;
    },
    validateState() {
      // 获取验证结果
      return this.xuFormItem ? this.xuFormItem.validateState : '';
    },
    needStatusIcon() {
      return this.xuForm ? this.xuForm.statusIcon : false;
    },
    validateIcon() {
      // 获取验证结果对应的图标
      return {
        validating: 'xu-icon-loading',
        success: 'xu-icon-circle-check',
        error: 'xu-icon-circle-close'
      }[this.validateState];
    },
    textareaStyle() {
      // 计算 输入框为 type=textarea 时的样式
      return merge({}, this.textareaCalcStyle, {resize: this.resize});
    },
    inputSize() {
      // 计算输入框的尺寸
      return this.size || this._xuFormItemSize || (this.$ELEMENT || {}).size;
    },
    inputDisabled() {
      // 计算输入框是否被禁用
      return this.disabled || (this.xuForm || {}).disabled;
    },
    nativeInputValue() {
      // 计算原生的input输入框的内容
      return this.value === null || this.value === undefined ? '' : this.value;
    },
    showClear() {
      // 是否显示清空图标
      return this.clearable && !this.inputDisabled && !this.readonly && this.nativeInputValue && ( this.focused || this.hovering );
    },
    classList() {
      let classList = [];

      classList.push(this.type === 'textarea' ? 'xu-textarea' : 'xu-input');
      if(this.inputSize) classList.push(`xu-input--${this.inputSize}`);
      if(this.inputDisabled) classList.push('is-disabled');
      if(this.$slots.prepend || this.$slots.append) classList.push('xu-input-group');
      if(this.$slots.append) classList.push('xu-input-group--append');
      if(this.$slots.prepend) classList.push('xu-input-group--prepend');
      if(this.$slots.prefix || this.prefixIcon) classList.push('xu-input--prefix');
      if(this.$slots.suffix || this.suffixIcon || this.clearable) classList.push('xu-input--suffix');

      return classList;
    }
  },
  watch: {
    value(val) {
      this.$nextTick(this.resizeTextarea);
      if(this.validateEvent) {
        this.dispatch('XuFormItem', 'xu.form.change', [val]);
      }
    }
  },
  methods: {
    focus() {
      // 触发输入表单元素的focus事件
      (this.$refs.input || this.$refs.textarea).focus();
    },
    blur() {
      // 触发输入表单元素的blur事件
      (this.$refs.input || this.$refs.textarea).blur();
    },
    select() {
      // 触发输入表单元素的select事件——一般是在表单的文本被选中时触发
      (this.$refs.input || this.$refs.textarea).select();
    },
    getMigratingConfig() {
      return {
        props: {
          'icon': 'icon is removed, use suffix-icon / prefix-icon instead',
          'on-icon-click': 'on-icon-click is removed.'
        },
        events: {
          'click': 'click is removed.'
        }
      }
    },
    resizeTextarea() {
      // 重新设置textarea文本输入框的大小
      if(this.$isServer) return;
      const { autosize, type } = this;
      if(type !== 'textarea') return;
      // 1.如果不允许textarea自适应内容的高度，则textarea的高度就是设置的最低高度
      if(!autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
        }
        return;
      }
      // 2.如果允许textarea自适应内容的高度，则textarea的高度随内容高度的变化，在设置的最大值和最小值之间变化
      const minRows = autosize.minRows;
      const maxRows = autosize.maxRows;

      this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
    },
    handleComposition(event) {
      // 处理composition输入事件
      if(event.type === 'compositionstart') {
        this.isOnComposition = true;
      }
      if(event.type === 'compositionend') {
        this.isOnComposition = false;
        this.handleInput(event);
      }
    },
    handleInput(event) {
      // 处理input事件
      if(this.isOnComposition) return;

      // 当在IE下不支持时，需要去掉下面这一行代码
      if(event.target.value === this.nativeInputValue) return;
      // 向上触发input事件
      this.$emit('input', event.target.value);

      // this.$nextTick(() => { this.$refs.input.value = this.value; });
    },
    handleFocus(event) {
      // 处理focus事件
      this.focused = true;
      this.$emit('focus', event);
    },
    handleBlur(event) {
      // 处理blur事件
      this.focused = false;
      this.$emit('blur', event);

      if(this.validateEvent) {
        this.dispatch('XuFormItem', 'xu.form.blur', [this.value]);
      }
    },
    handleChange(event) {
      // 处理change事件
      this.$emit('change', event.target.value);
    },
    calcIconOffset(place) {
      let xuList = [].slice.call(this.$el.querySelectorAll(`.xu-input__${place}`) || []);
      if(!xuList.length) return;

      let el = null;
      for(let i = 0; i < xuList.length; i++) {
        if(xuList[i].parentNode === this.$el) {
          el = xuList[i];
          break;
        }
      }
      if(!el) return;
      const pendantMap = {
        suffix: 'append',
        prefix: 'prepend'
      };
      const pendant = pendantMap[place];
      if(this.$slots[pendant]) {
        el.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${this.$el.querySelector(`.xu-input-group__${pendant}`).offsetWidth}px)`;
      } else {
        el.removeAttribute('style');
      }
    },
    updateIconOffset() {
      this.calcIconOffset(`prefix`);
      this.calcIconOffset('suffix');
    },
    clear() {
      this.$emit('input', '');              // 清空input输入框中的数据
      this.$emit('change', '');
      this.$emit('clear');
    }
  },
  created() {
    this.$on('inputSelect', this.select);
  },
  mounted() {
    this.resizeTextarea();
    this.updateIconOffset();
  },
  updated() {
    this.$nextTick(this.updateIconOffset);
  }
}
</script>

<style lang="css">
</style>
