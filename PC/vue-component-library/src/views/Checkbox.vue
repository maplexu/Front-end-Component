<template lang="html">
  <div class="">
    <h2 class="content-title">Checkbox复选框</h2>

    <div class="content-item">
      <h3 class="content-topic">基本用法</h3>
      <p><code>&#60;xu-checkbox&#62;</code>单独使用，在<code>v-model</code>中绑定变量，变量类型默认为<code>Boolean</code>，选中状态时为<code>true</code></p>
      <showExample>
        <div class="content-example">
          <xu-checkbox v-model="testData1.value1">复选项1</xu-checkbox>
          <xu-checkbox v-model="testData1.value2">复选项2</xu-checkbox>
          <xu-checkbox v-model="testData1.value3">复选项3</xu-checkbox>
          <xu-checkbox v-model="testData1.value4">复选项4</xu-checkbox>
        </div>
      </showExample>
      <p><code>&#60;xu-checkbox&#62;</code>单独使用，并且设置成禁用状态</p>
      <showExample>
        <div class="content-example">
          <xu-checkbox v-model="testData2.value1" disabled>复选项1</xu-checkbox>
          <xu-checkbox v-model="testData2.value2" disabled>复选项2</xu-checkbox>
          <xu-checkbox v-model="testData2.value3" disabled>复选项3</xu-checkbox>
          <xu-checkbox v-model="testData2.value4" disabled>复选项4</xu-checkbox>
        </div>
      </showExample>
    </div>

    <div class="content-item">
      <h3 class="content-topic">多选框组</h3>
      <p><code>&#60;xu-checkbox-group&#62;</code>管理多个<code>&#60;xu-checkbox&#62;</code>，<code>&#60;xu-checkbox-group&#62;</code>中使用<code>v-model</code>绑定<code>Array</code>类型的变量，<code>&#60;xu-checkbox&#62;</code>的<code>label</code>属性是该<code>&#60;xu-checkbox&#62;</code>对应的值</p>
      <showExample>
        <div class="content-example">
          <xu-checkbox-group v-model="testData3">
            <xu-checkbox label="1">复选项1</xu-checkbox>
            <xu-checkbox label="2">复选项2</xu-checkbox>
            <xu-checkbox label="3">复选项3</xu-checkbox>
            <xu-checkbox label="4">复选项4</xu-checkbox>
          </xu-checkbox-group>
        </div>
      </showExample>
      <p><code>&#60;xu-checkbox&#62;</code>管理多个<code>&#60;xu-checkbox&#62;</code>时，部分<code>&#60;xu-checkbox&#62;</code>设置<code>disabled</code>禁用</p>
      <showExample>
        <div class="content-example">
          <xu-checkbox-group v-model="testData4">
            <xu-checkbox label="1">复选项1</xu-checkbox>
            <xu-checkbox label="2">复选项2</xu-checkbox>
            <xu-checkbox label="3">复选项3</xu-checkbox>
            <xu-checkbox label="4" disabled>复选项4</xu-checkbox>
            <xu-checkbox label="5" disabled>复选项5</xu-checkbox>
          </xu-checkbox-group>
        </div>
      </showExample>
      <p><code>&#60;xu-checkbox&#62;</code>管理多个<code>&#60;xu-checkbox&#62;</code>时，<code>&#60;xu-checkbox-group&#62;</code>设置<code>disabled</code>禁用</p>
      <showExample>
        <div class="content-example">
          <xu-checkbox-group v-model="testData5" disabled>
            <xu-checkbox label="1">复选项1</xu-checkbox>
            <xu-checkbox label="2">复选项2</xu-checkbox>
            <xu-checkbox label="3">复选项3</xu-checkbox>
            <xu-checkbox label="4">复选项4</xu-checkbox>
            <xu-checkbox label="5">复选项5</xu-checkbox>
          </xu-checkbox-group>
        </div>
      </showExample>
      <p><code>&#60;xu-checkbox&#62;</code>管理多个<code>&#60;xu-checkbox&#62;</code>时，对可选项目进行数量的限制</p>
      <showExample>
        <div class="content-example">
          <xu-checkbox-group v-model="testData6" :min="2" :max="4">
            <xu-checkbox label="1">复选项1</xu-checkbox>
            <xu-checkbox label="2">复选项2</xu-checkbox>
            <xu-checkbox label="3">复选项3</xu-checkbox>
            <xu-checkbox label="4">复选项4</xu-checkbox>
            <xu-checkbox label="5">复选项5</xu-checkbox>
          </xu-checkbox-group>
        </div>
      </showExample>
    </div>

    <div class="content-item">
      <h3 class="content-topic">indeterminate状态</h3>
      <p><code>indeterminate</code>状态用于表示<code>&#60;xu-checkbox&#62;</code>是否全部选中的不确定状态</p>
      <showExample>
        <div class="content-example">
          <xu-checkbox :indeterminate="isIndeterminate" v-model="isCheckAll" @change="handleCheckAllChange">全选</xu-checkbox>
          <div style="margin: 15px 0;"></div>
          <xu-checkbox-group v-model="checkedDataList" @change="handleCheckedChange">
            <xu-checkbox v-for="item in countryList" :key="item" :label="item"></xu-checkbox>
          </xu-checkbox-group>
        </div>
      </showExample>
    </div>
  </div>
</template>

<script>
import showExample from 'business-comp/demo-box';
import Checkbox from 'basic-comp/checkbox/checkbox.vue';
import CheckboxGroup from 'basic-comp/checkbox/checkbox-group.vue';

export default {
  components: {
    showExample,
    'xu-checkbox': Checkbox,
    'xu-checkbox-group': CheckboxGroup
  },
  data() {
    return {
      testData1: {
        value1: false,
        value2: false,
        value3: false,
        value4: false
      },
      testData2: {
        value1: false,
        value2: true,
        value3: false,
        value4: true
      },
      testData3: ['1', '3'],
      testData4: ['1', '3', '5'],
      testData5: ['1', '3', '5'],
      testData6: ['1', '2', '5'],
      isIndeterminate: true,
      checkedDataList: ['中国', '美国', '俄罗斯', '英国', '法国'],
      countryList: ['中国', '美国', '俄罗斯', '英国', '法国']
    }
  },
  methods: {
    // 点击全选按钮的操作响应
    handleCheckAllChange(val) {
      // 只要点击了全选按钮（不管是全选还是取消全选），都要取消indeterminate状态-->因为此时不是全部选中就是全部不选中的状态
      this.isIndeterminate = false;
      // 根据是否全选/全部不选，决定<xu-checkbox-group>绑定的值
      this.checkedDataList = val ? this.countryList : [];
    },
    // 点击普通的多选按钮的操作响应
    handleCheckedChange(value) {
      // 这里主要是判断当前已选中项的数目和所有的按钮的数目
        // 若 已选数 == 全部数：则全选按钮那里是选中的状态
        // 若 已选数 == 0：则全选按钮那里是非选中状态
        // 若 0 < 已选数 < 全部数：则全选按钮那里是 indeterminate的状态
      let checkedCount = this.checkedDataList.length;
      this.isIndeterminate = 0 < checkedCount && checkedCount < this.countryList.length;
    }
  },
  computed: {
    isCheckAll: {
      get() {
        return this.checkedDataList.length === this.countryList.length;
      },
      set(val) {

      }
    }
  }
}
</script>

<style lang="css">
</style>
