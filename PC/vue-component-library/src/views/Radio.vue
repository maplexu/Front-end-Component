<template lang="html">
  <div class="">
    <h2 class="content-title">Radio单选框</h2>

    <div class="content-item">
      <h3 class="content-topic">基础用法</h3>
      <p><code>&#60;xu-radio&#62;</code>传入的内容就是该按钮组件的显示内容</p>
      <showExample>
        <div class="content-example">
          <xu-radio v-model="radioValue1" label="1">按钮选项1</xu-radio>
          <xu-radio v-model="radioValue1" label="2">按钮选项2</xu-radio>
        </div>
      </showExample>
      <p><code>&#60;xu-radio&#62;</code>若没有传入内容，将会以<code>label</code>值作为显示内容</p>
      <showExample>
        <div class="content-example">
          <xu-radio v-model="radioValue2" label="1"></xu-radio>
          <xu-radio v-model="radioValue2" label="2"></xu-radio>
        </div>
      </showExample>
      <p>带有边框</p>
      <showExample>
        <div class="content-example">
          <xu-radio v-model="radioValue3" label="1" border>按钮选项1</xu-radio>
          <xu-radio v-model="radioValue3" label="2" border>按钮选项2</xu-radio>
        </div>
      </showExample>
    </div>

    <div class="content-item">
      <h3 class="content-topic">禁用状态</h3>
      <p>单选按钮不可用状态</p>
      <showExample>
        <div class="content-example">
          <xu-radio v-model="radioValue4" label="1" disabled>按钮选项1</xu-radio>
          <xu-radio v-model="radioValue4" label="2" disabled>按钮选项2</xu-radio>
        </div>
      </showExample>
    </div>

    <div class="content-item">
      <h3 class="content-topic">单选框组</h3>
      <p>结合<code>&#60;xu-radio-group&#62;</code>组件和<code>&#60;xu-radio&#62;</code>组件实现单选按钮组</p>
      <showExample>
        <div class="content-example">
          <xu-radio-group v-model="radioValue5" >
            <xu-radio label="1">按钮选项1</xu-radio>
            <xu-radio label="2">按钮选项2</xu-radio>
          </xu-radio-group>
        </div>
      </showExample>
    </div>

    <div class="content-item">
      <h3 class="content-topic">按钮样式</h3>
      <p>按钮样式的单选组合</p>
      <showExample>
        <div class="content-example">
          <xu-radio-group v-model="radioValue6">
            <xu-radio-button label="1">按钮选项1</xu-radio-button>
            <xu-radio-button label="2">按钮选项2</xu-radio-button>
          </xu-radio-group>
        </div>
      </showExample>
    </div>
  </div>
</template>

<script>
import showExample from '../otherComponents/showExample.vue';
import Radio from '../components/radio/radio.vue';
import RadioGroup from '../components/radio/radio-group.vue';
import RadioButton from 'src/components/radio/radio-button.vue';

export default {
  components: {
    showExample,
    'xu-radio': Radio,
    'xu-radio-group': RadioGroup,
    'xu-radio-button': RadioButton
  },
  data() {
    return {
      radioValue1: '1',
      radioValue2: '1',
      radioValue3: '1',
      radioValue4: '1',
      radioValue5: '0',
      radioValue6: '1'
    }
  },
  methods: {

  }
}
</script>

<style lang="css">
</style>
