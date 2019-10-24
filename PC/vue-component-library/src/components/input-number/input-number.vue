<template lang="html">
  <div :class="classList" @dragstart.prevent>
    <!-- 1.计数器的减小数字按钮 -->
    <span class="xu-input-number__decrease" :class="{'is-disabled': minDisabled}" role="button" v-if="controls" v-repeat-click="decrease" @keydown.enter="decrease">
      <i :class="`xu-icon-${controlsAtRight ? 'arrow-down' : 'minus'}`"></i>
    </span>
    <!-- 2.计数器的增大数字按钮 -->
    <span class="xu-input-number__increase" :class="{'is-disabled': maxDisabled}" role="button" v-if="controls" v-repeat-click="increase" @keydown.enter="increase">
      <i :class="`xu-icon-${controlsAtRight ? 'arrow-up' : 'plus'}`"></i>
    </span>
    <!-- 3.输入框，用于显示和输入计数器的数字内容 -->
    <xu-input
      ref="input"
      :value="displayValue" :placeholder="placeholder" :disabled="inputNumberDisabled" :size="inputNumberSize" :max="max" :min="min" :name="name" :label="label"
      @input="handleInput" @change="handleInputChange" @blur="handleBlur" @focus="handleFocus"
      @keydown.up.native.prevent="increase" @keydown.down.native.prevent="decrease"
    ></xu-input>
  </div>
</template>

<script>
import Input from '../input/input.vue';
import Focus from 'src/mixins/focus.js';
import RepeatClick from 'src/directives/repeat-click.js';

export default {
  name: 'XuInputNumber',
  componentName: 'XuInputNumber',
  components:  { 'xu-input': Input },
  directives: {
    repeatClick: RepeatClick
  },
  mixins: [Focus('input')],
  inject: {
    xuForm: {
      default: ''
    },
    xuFormItem: {
      default: ''
    }
  },
  mixins: [],
  props: {
    step: {                                             // 计数器的步长
      type: Number,
      default: 1
    },
    max: {                                             // 设置计数器允许的最大值
      type: Number,
      default: Infinity
    },
    min: {                                             // 设置计数器允许的最小值
      type: Number,
      default: -Infinity
    },
    value: {},                                          // v-model指令绑定的值
    disabled: Boolean,                                  // 是否禁用计数器
    size: String,                                       // 计数器尺寸
    controls: {                                         // 是否使用控制按钮
      type: Boolean,
      default: true
    },
    controlsPosition: {                                 // 控制按钮位置
      type: String,
      default: ''
    },
    name: String,                                       // name（原生属性）
    label: String,                                      // 输入框关联的label文字
    placeholder: String,                                // 输入框默认的placeholder文字
    precision: {                                        // 数值精度
      type: Number,
      validator(val) {
        return val >=0 && val === parseInt(val, 10);
      }
    }
  },
  // 监听v-model传入的value的值，需要对传入的值类型、传入的值是否超出范围进行判断和处理
  watch: {
    value: {
      immediate: true,                            // v-model的值一传进来，就能检测到变化
      handler(value) {
        // 获取当前的值
        let newVal = value === undefined ? value : Number(value);
        // 判断值是否存在？是否是数字？是的话并按照设置的精度进行运算
        if(newVal !== undefined) {
          if(isNaN(newVal)) {
            return;
          }
          if(this.precision !== undefined) {
            newVal = this.toPrecision(newVal, this.precision);
          }
        }
        // 判断值的大小是否超过了设置的取值范围
        if(newVal >= this.max) newVal = this.max;
        if(newVal <= this.min) newVal = this.min;
        this.currentValue = newVal;
        this.userInput = null;
        this.$emit('input', newVal);
      }
    }
  },
  data() {
    return {
      currentValue: 0,               // 用一个变量来记录计数器当前的值
      userInput: null                // 该变量的作用：在input和change操作之间判断input输入框的值是否是一个数字，若不是数字，则值为null；若是数字，则该值就是这个输入的数字
    }
  },
  computed: {
    _xuFormItemSize() {
      return (this.xuFormItem || {}).xuFormItemSize;
    },
    // // 计算该计数器组件的数值精度
    numPrecision() {
      const { value, step, getPrecision, precision } = this;
      const stepPrecision = getPrecision(step);                         //计算出计数器步长的小数点位数

      if(precision !== undefined) {
        // 如果主动设置了精度，则计数器的数值进度就采用该值
        if(stepPrecision > precision) {
          console.warn('[Element Warn][InputNumber]precision should not be less than the decimal places of step');
        }
        return precision;
      } else {
        // 如果没有设置精度，则计数器的数值进度取 （输入框的当前值） 和 （设置的步长）中最长的小数位
        return Math.max(getPrecision(value), stepPrecision);
      }
    },
    minDisabled() {
      // 计算是否允许继续缩小值（判断如果允许减小值，减小后的值是否低于最小值）
      return this._decrease(this.value, this.step) < this.min;
    },
    maxDisabled() {
      // 计算是否允许继续增加值（判断如果允许增加值，增加后的值是否超过了最大值）
      return this._increase(this.value, this.step) > this.max;
    },
    // 判断该计数器的控制按钮是否是在右侧
    controlsAtRight() {
      return this.controls && this.controlsPosition === 'right';
    },
    // 计算该计数器的尺寸
    inputNumberSize() {
      return this.size || this._xuFormItemSize || (this.$ELEMENT || {}).size;
    },
    // 判断该计数器是否被禁用
    inputNumberDisabled() {
      return this.disabled || (this.xuForm || {}).disabled;
    },
    // 计算出该计数器组件根容器的样式类集合
    classList() {
      let classList = ['xu-input-number'];

      if(this.inputNumberSize) classList.push(`xu-input-number--${this.inputNumberSize}`);
      if(this.inputNumberDisabled) classList.push('is-disabled');
      if(!this.controls) classList.push('is-without-controls');
      if(this.controlsAtRight) classList.push('is-controls-right');

      return classList;
    },
    // 计算出绑定到输入框上的内容值
    displayValue() {
      // displayValue的值先从 userInput来判断（判断是否有输入值，并且输入值是数字）
      if(this.userInput !== null) {
        return this.userInput;
      }

      // 若不满足上面的条件，display的值就根据currentValue计算而来
      const currentValue = this.currentValue;
      if(typeof currentValue === 'number' && this.precision !== undefined) {
        return currentValue.toFixed(this.precision);
      } else {
        return currentValue;
      }
    }
  },
  methods: {
    // 计算一个数值的小数位数
    getPrecision(value) {
      if(value === undefined) return 0;
      const valueString = value.toString();                   // 将数值转化成字符串
      const dotPosition = valueString.indexOf('.');           // 计算小数点在数字中的位置
      let precision = 0;
      if(dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1;     // 计算出小数点的位数
      }
      return precision;
    },
    // 固定数字的小数到具体的几位
    toPrecision(num, precision) {
      if(precision === undefined) precision = this.numPrecision;
      return parseFloat(Number(num).toFixed(precision));
    },
    // 计算出当前值进行步长递减操作后的值（结果小数点具体到精度长度）
    _decrease(val, step){
      if(typeof val !== 'number' && val !== undefined) return this.currentValue;

      // 先求10的n次幂，在用于数值计算中，可有效解决js浮点数运算的精度问题
      const precisionFactor = Math.pow(10, this.numPrecision);
      return this.toPrecision((precisionFactor*val - precisionFactor*step) / precisionFactor);
    },
    // 计算出当前值进行步长递增操作后的值（结果小数点具体到精度长度）
    _increase(val, step) {
      if(typeof val!== 'number' && val !== undefined) return this.currentValue;

      const precisionFactor = Math.pow(10, this.numPrecision);
      return this.toPrecision((precisionFactor*val + precisionFactor*step) / precisionFactor);
    },
    // 增大值
    increase() {
      if(this.inputDisabled || this.maxDisabled) return;
      const value = this.value || 0;
      const newVal = this._increase(value, this.step);
      this.setCurrentValue(newVal);
    },
    // 减小值
    decrease() {
      if(this.inputDisabled || this.minDisabled) return;
      const value = this.value || 0;
      const newVal = this._decrease(value, this.step);
      this.setCurrentValue(newVal);
    },
    // 处理input元素的blur事件
    handleBlur(event) {
      // 组件的input失去焦点时，向组件发出blur事件
      this.$emit('blur', event);
    },
    // 处理input元素的focus事件
    handleFocus(event) {
      // 组件的input获得焦点时，向组件发出focus事件
      this.$emit('focus', event);
    },
    handleInput(value) {
      this.userInput = value;
    },
    handleInputChange(value) {
      const newVal = value === '' ? undefined : Number(value);
      if(!isNaN(newVal)) {
        this.setCurrentValue(newVal);
      } else {
        this.userInput = null;
      }
    },
    // 给组件的input写入新的值
    setCurrentValue(newVal) {
      const oldVal = this.currentValue;
      if(typeof newVal === 'Number' && this.precision !== undefined) {
        newVal = this.toPrecision(newVal, this.precision);
      }
      if(newVal >= this.max) newVal = this.max;
      if(newVal <= this.min) newVal = this.min;

      this.userInput = null;
      if(oldVal === newVal) return;

      this.$emit('input', newVal);                    // 向上发出input事件，修改v-model绑定的value的值
      this.$emit('change', newVal, oldVal);
    },
    select() {
      this.$refs.input.select();
    }
  },
  mounted() {
    let innerInput = this.$refs.input.$refs.input;
    innerInput.setAttribute('role', 'spinbutton');
    innerInput.setAttribute('aria-valuemax', this.max);
    innerInput.setAttribute('aria-valuemin', this.min);
    innerInput.setAttribute('aria-valuenow', this.currentValue);
    innerInput.setAttribute('aria-disabled', this.inputNumberDisabled);
  },
  updated() {
    if (!this.$refs || !this.$refs.input) return;
    const innerInput = this.$refs.input.$refs.input;
    innerInput.setAttribute('aria-valuenow', this.currentValue);
  }
}
</script>

<style lang="css">
</style>
