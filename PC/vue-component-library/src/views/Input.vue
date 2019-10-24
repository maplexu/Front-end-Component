<template lang="html">
  <div class="">
    <h2 class="content-title">Input输入框</h2>

    <div class="content-item">
      <h3 class="content-topic">基础用法</h3>
      <p><code>&#60;xu-input&#62;</code>组件的宽度默认是<code>width: 100%</code>父元素的宽度</p>
      <showExample>
        <div class="content-example">
          <xu-input v-model="inputData1.value1" placeholder="请输入内容"></xu-input>
        </div>
      </showExample>
      <p>可以手动给<code>&#60;xu-input&#62;</code>组件设置宽度，<code>style="width: 200px"</code></p>
      <showExample>
        <div class="content-example">
          <xu-input v-model="inputData1.value2" placeholder="请输入内容" style="width: 200px;"></xu-input>
        </div>
      </showExample>
      <p>给<code>&#60;xu-input&#62;</code>组件设置<code>disabled</code>禁用状态</p>
      <showExample>
        <div class="content-example">
          <xu-input v-model="inputData1.value3" placeholder="请输入内容" style="width: 200px;" disabled></xu-input>
        </div>
      </showExample>
      <p>给<code>&#60;xu-input&#62;</code>组件设置<code>clearable</code>可清空状态</p>
      <showExample>
        <div class="content-example">
          <xu-input v-model="inputData1.value4" placeholder="请输入内容" style="width: 200px;" clearable></xu-input>
        </div>
      </showExample>
      <p>给<code>&#60;xu-input&#62;</code>组件设置<code>size</code>属性来设置不同的尺寸</p>
      <showExample>
        <div class="content-example">
          <xu-input v-model="inputData1.value5" placeholder="默认尺寸输入框" suffix-icon="xu-icon-edit" style="width: 150px; margin-right: 10px;"></xu-input>
          <xu-input v-model="inputData1.value5" placeholder="medium尺寸输入框" size="medium" suffix-icon="xu-icon-edit" style="width: 150px; margin-right: 10px;"></xu-input>
          <xu-input v-model="inputData1.value5" placeholder="small尺寸输入框" size="small" suffix-icon="xu-icon-edit" style="width: 150px; margin-right: 10px;"></xu-input>
          <xu-input v-model="inputData1.value5" placeholder="mini尺寸输入框" size="mini" suffix-icon="xu-icon-edit" style="width: 150px;"></xu-input>
        </div>
      </showExample>
    </div>

    <div class="content-item">
      <h3 class="content-topic">带icon的输入框</h3>
      <p>可通过<code>属性方式</code>给<code>&#60;xu-input&#62;</code>组件添加<code>icon</code></p>
      <showExample>
        <div class="content-example">
          <xu-input v-model="inputData2.value1" placeholder="前置图标输入框" prefix-icon="xu-icon-search" style="width: 200px;"></xu-input>
          <xu-input v-model="inputData2.value2" placeholder="后置图标输入框" suffix-icon="xu-icon-date" style="width: 200px; margin-left: 30px;"></xu-input>
        </div>
      </showExample>
      <p>也可通过<code>slot方式</code>给<code>&#60;xu-input&#62;</code>组件添加<code>icon</code></p>
      <showExample>
        <div class="content-example">
          <xu-input v-model="inputData2.value3" placeholder="前置图标输入框" style="width: 200px;">
            <i slot="prefix" class="xu-input__icon xu-icon-search"></i>
          </xu-input>
          <xu-input v-model="inputData2.value4" placeholder="后置图标输入框" style="width: 200px; margin-left: 30px;">
            <i slot="suffix" class="xu-input__icon xu-icon-date"></i>
          </xu-input>
        </div>
      </showExample>
    </div>

    <div class="content-item">
      <h3 class="content-topic">复合型输入框</h3>
      <p>可放置前置或后置元素，一般放标签或按钮</p>
      <showExample>
        <div class="content-example">
          <div style="margin-bottom: 10px;">
            <xu-input placeholder="这是一个放置了前置元素的输入框" v-model="inputData3.value1">
              <template slot="prepend">Http://</template>
            </xu-input>
          </div>
          <div style="margin-bottom: 10px;">
            <xu-input placeholder="这是一个放置了后置元素的输入框" v-model="inputData3.value1">
              <template slot="append">.com</template>
            </xu-input>
          </div>
          <div>
            <xu-input placeholder="这是一个放置了前置和后置元素的输入框" v-model="inputData3.value1">
              <template slot="prepend">Http://</template>
              <template slot="append">.com</template>
            </xu-input>
          </div>
        </div>
      </showExample>
    </div>

    <div class="content-item">
      <h3 class="content-topic">文本域</h3>
      <p>将<code>type</code>属性值设置为<code>textarea</code>，即可输入多行文本信息</p>
      <showExample>
        <div class="content-example">
          <xu-input type="textarea" placeholder="请输入文本域的内容" v-model="textareaData.value1"></xu-input>
        </div>
      </showExample>
      <p>自适应文本高度的文本域，设置<code>autosize</code>属性</p>
      <showExample>
        <div class="content-example">
          <xu-input type="textarea" placeholder="请输入文本域的内容" v-model="textareaData.value2" autosize></xu-input>
        </div>
      </showExample>
      <p>自适应文本高度的文本域，<code>autosize</code>属性还可以设置成一个对象，指定自适应变化的最小行数和最大行数</p>
      <showExample>
        <div class="content-example">
          <xu-input type="textarea" placeholder="请输入文本域的内容" v-model="textareaData.value3" :autosize="{ minRows: 2, maxRows: 5 }"></xu-input>
        </div>
      </showExample>
    </div>

  </div>
</template>

<script>
import showExample from 'src/otherComponents/showExample.vue';
import Input from 'src/components/input/input.vue';

export default {
  components: {
    showExample,
    'xu-input': Input
  },
  data() {
    return {
      inputData1: {
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '',
        value8: ''
      },
      inputData2: {
        value1: '',
        value2: '',
        value3: '',
        value4: ''
      },
      inputData3: {
        value1: '',
        value2: '',
        value3: ''
      },
      textareaData: {
        value1: '',
        value2: '',
        value3: ''
      }
    }
  }
}
</script>

<style lang="css">
</style>
