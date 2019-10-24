<template lang="html">
  <div class="">
    <h2 class="content-title">InputNumber计数器</h2>

    <div class="content-item">
      <h3 class="content-topic">基础用法</h3>
      <p>仅允许输入标准的数字</p>
      <showExample>
        <div class="content-example">
          <xu-input-number v-model="num1"></xu-input-number>
        </div>
      </showExample>
      <p>通过<code>step</code>属性设置步长</p>
      <showExample>
        <div class="content-example">
          <xu-input-number v-model="num2" :step="step2"></xu-input-number>
        </div>
      </showExample>
      <p>通过<code>min、max</code>属性设置计数器的最大值和最小值</p>
      <showExample>
        <div class="content-example">
          <xu-input-number v-model="num3" :step="step2" :min="min" :max="max"></xu-input-number>
        </div>
      </showExample>
      <p>通过<code>disabled</code>属性设置计数器禁用</p>
      <showExample>
        <div class="content-example">
          <xu-input-number v-model="num4" disabled></xu-input-number>
        </div>
      </showExample>
      <p>通过<code>precision</code>属性设置计数器的精度，注意：<code>precision</code>的值必须是一个非负整数，并且不能小于<code>step</code>步长的小数位数</p>
      <showExample>
        <div class="content-example">
          <xu-input-number v-model="num5" :step="0.1" :precision="2" :max="10"></xu-input-number>
        </div>
      </showExample>
    </div>

    <div class="content-item">
      <h3 class="content-topic">不同尺寸</h3>
      <p>额外可使用<code>medium</code>、<code>small</code>、<code>mini</code>三种尺寸的数字输入框</p>
      <showExample>
        <div class="content-example">
          <xu-input-number v-model="num6" style="margin-right: 10px;"></xu-input-number>
          <xu-input-number v-model="num6" size="medium" style="margin-right: 10px;"></xu-input-number>
          <xu-input-number v-model="num6" size="small" style="margin-right: 10px;"></xu-input-number>
          <xu-input-number v-model="num6" size="mini"></xu-input-number>
        </div>
      </showExample>
    </div>

    <div class="content-item">
      <h3 class="content-topic">按钮全部放在右侧位置</h3>
      <p>使用<code>controls-position="right"</code>来设置按钮位置在右侧</p>
      <showExample>
        <div class="content-example">
          <xu-input-number v-model="num7" controls-position="right" :min="0" :max="10"></xu-input-number>
        </div>
      </showExample>
    </div>
  </div>
</template>

<script>
import InputNumber from 'src/components/input-number/input-number.vue';
import showExample from 'src/otherComponents/showExample.vue';

export default {
  components: {
    "xu-input-number": InputNumber,
    showExample
  },
  data() {
    return {
      num1: 1,
      num2: 2,
      step2: 2,
      num3: 1,
      min: 4,
      max: 10,
      num4: 1,
      num5: 1,
      num6: 2,
      num7: 1
    }
  },
  methods: {
    showChange(newVal, oldVal) {
      console.log('打印当前的value值', this.value1);
    }
  }
}
</script>

<style lang="css">
</style>
