<template lang="html">
  <div class="">
    <h2 class="content-title">Button按钮</h2>

    <div class="content-item">
      <h3 class="content-topic">基本用法</h3>
      <p>按钮的基本用法：</p>
      <showExample>
        <div class="content-example">
          <xu-row>
            <xu-button type="text">文字按钮</xu-button>
            <xu-button>默认按钮</xu-button>
            <xu-button type="primary">主要按钮</xu-button>
            <xu-button type="success">成功按钮</xu-button>
            <xu-button type="info">信息按钮</xu-button>
            <xu-button type="warning">警告按钮</xu-button>
            <xu-button type="danger">危险按钮</xu-button>
          </xu-row>
        </div>
      </showExample>
      <p>按钮禁用状态：</p>
      <showExample>
        <div class="content-example">
          <xu-row>
            <xu-button type="text" disabled>文字按钮</xu-button>
            <xu-button disabled>默认按钮</xu-button>
            <xu-button type="primary" disabled>主要按钮</xu-button>
            <xu-button type="success" disabled>成功按钮</xu-button>
            <xu-button type="info" disabled>信息按钮</xu-button>
            <xu-button type="warning" disabled>警告按钮</xu-button>
            <xu-button type="danger" disabled>危险按钮</xu-button>
          </xu-row>
        </div>
      </showExample>
      <p>朴素按钮的基本用法（对应上面的各类型按钮）：</p>
      <showExample>
        <div class="content-example">
          <xu-row>
            <xu-button type="text" plain>文字按钮</xu-button>
            <xu-button plain>默认按钮</xu-button>
            <xu-button type="primary" plain>主要按钮</xu-button>
            <xu-button type="success" plain>成功按钮</xu-button>
            <xu-button type="info" plain>信息按钮</xu-button>
            <xu-button type="warning" plain>警告按钮</xu-button>
            <xu-button type="danger" plain>危险按钮</xu-button>
          </xu-row>
        </div>
      </showExample>
      <p>圆角按钮（对应上面的各类型按钮）：</p>
      <showExample>
        <div class="content-example">
          <xu-row>
            <xu-button round>默认按钮</xu-button>
            <xu-button type="primary" round>主要按钮</xu-button>
            <xu-button type="success" round>成功按钮</xu-button>
            <xu-button type="info" round>信息按钮</xu-button>
            <xu-button type="warning" round>警告按钮</xu-button>
            <xu-button type="danger" round>危险按钮</xu-button>
          </xu-row>
        </div>
      </showExample>
      <p>文字按钮：</p>
      <showExample>
        <div class="content-example">
          <xu-row>
            <xu-button round>文字按钮</xu-button>
            <xu-button type="primary" round>主要按钮</xu-button>
          </xu-row>
        </div>
      </showExample>
      <p>圆形按钮：</p>
      <showExample>
        <div class="content-example">
          <xu-row>
            <xu-button circle icon="xu-icon-search"></xu-button>
            <xu-button type="primary" circle icon="xu-icon-edit"></xu-button>
            <xu-button type="success" circle icon="xu-icon-check"></xu-button>
            <xu-button type="info" circle icon="xu-icon-message"></xu-button>
            <xu-button type="warning" circle icon="xu-icon-star-off"></xu-button>
            <xu-button type="danger" circle icon="xu-icon-delete"></xu-button>
          </xu-row>
        </div>
      </showExample>
    </div>
    <div class="content-item">
      <h3 class="content-topic">带图标按钮</h3>
      <p>按钮可以是图标单独存在，也可以是图标和文字一起存在</p>
      <showExample>
        <div class="content-example">
          <xu-row>
            <xu-button type="primary" icon="xu-icon-search"></xu-button>
            <xu-button type="primary" icon="xu-icon-search">搜索</xu-button>
            <xu-button type="primary" icon="xu-icon-upload"></xu-button>
            <xu-button type="primary" icon="xu-icon-upload">上传</xu-button>
            <xu-button type="primary">上传<i class="xu-icon-upload xu-icon--right"></i></xu-button>
          </xu-row>
        </div>
      </showExample>
    </div>
    <div class="content-item">
      <h3 class="content-topic">loading按钮</h3>
      <p>点击按钮后进行数据加载操作，在按钮上显示加载状态，此时按钮处于不可操作状态（注意：loading按钮中不能用图标）</p>
      <showExample>
        <div class="content-example">
          <xu-row>
            <xu-button type="primary" icon="xu-icon-search" loading></xu-button>
            <xu-button type="primary" loading>搜索</xu-button>
            <xu-button type="primary" icon="xu-icon-search" loading>搜索</xu-button>
          </xu-row>
        </div>
      </showExample>
    </div>
    <div class="content-item">
      <h3 class="content-topic">按钮不同尺寸</h3>
      <p>点击按钮后进行数据加载操作，在按钮上显示加载状态，此时按钮处于不可操作状态（注意：loading按钮中不能用图标）</p>
      <showExample>
        <div class="content-example">
          <xu-row>
            <xu-button type="primary">默认尺寸</xu-button>
            <xu-button type="primary" size="medium">中等按钮</xu-button>
            <xu-button type="primary" size="small">小型按钮</xu-button>
            <xu-button type="primary" size="mini">超小按钮</xu-button>
          </xu-row>
        </div>
      </showExample>
    </div>
  </div>
</template>

<script>
import showExample from 'business-comp/demo-box';
import Row from 'basic-comp/layout/row/row.vue';
import Button from 'basic-comp/button/button.vue';

export default {
  components: {
    showExample,
    'xu-row': Row,
    'xu-button': Button,
  },
}
</script>

<style lang="scss" scoped>

</style>
