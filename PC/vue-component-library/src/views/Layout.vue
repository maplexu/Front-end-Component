<template lang="html">
  <div class="">
    <h2 class="content-title">Layout布局</h2>

    <div class="content-item">
      <h3 class="content-topic">基础布局</h3>
      <p>基础布局</p>
      <showExample>
        <div class="content-example">
          <xu-row class="row-class">
            <xu-col class="col-class"><div class="grid-content1 bg-purple-dark"></div></xu-col>
          </xu-row>
          <xu-row class="row-class">
            <xu-col :span="12" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
            <xu-col :span="12" class="col-class"><div class="grid-content1 bg-purple-light"></div></xu-col>
          </xu-row>
          <xu-row class="row-class">
            <xu-col :span="8" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
            <xu-col :span="8" class="col-class"><div class="grid-content1 bg-purple-light"></div></xu-col>
            <xu-col :span="8" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
          </xu-row>
          <xu-row class="row-class">
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple-light"></div></xu-col>
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple-light"></div></xu-col>
          </xu-row>
          <xu-row class="row-class">
            <xu-col :span="4" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
            <xu-col :span="4" class="col-class"><div class="grid-content1 bg-purple-light"></div></xu-col>
            <xu-col :span="4" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
            <xu-col :span="4" class="col-class"><div class="grid-content1 bg-purple-light"></div></xu-col>
            <xu-col :span="4" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
            <xu-col :span="4" class="col-class"><div class="grid-content1 bg-purple-light"></div></xu-col>
          </xu-row>
        </div>
      </showExample>
    </div>
    <div class="content-item">
      <h3 class="content-topic">分栏间隔</h3>
      <p>分栏之间存在间隔</p>
      <showExample>
        <div class="content-example">
          <xu-row class="row-class" :gutter="20">
            <xu-col class="col-class"><div class="grid-content1 bg-purple-dark"></div></xu-col>
          </xu-row>
          <xu-row class="row-class" :gutter="20">
            <xu-col :span="12" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
            <xu-col :span="12" class="col-class"><div class="grid-content1 bg-purple-light"></div></xu-col>
          </xu-row>
          <xu-row class="row-class" :gutter="20">
            <xu-col :span="8" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
            <xu-col :span="8" class="col-class"><div class="grid-content1 bg-purple-light"></div></xu-col>
            <xu-col :span="8" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
          </xu-row>
        </div>
      </showExample>
    </div>

    <div class="content-item">
      <h3 class="content-topic">分栏偏移</h3>
      <p></p>
      <showExample>
        <div class="content-example">
          <xu-row class="row-class">
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
            <xu-col :span="6" :offset="6" class="col-class"><div class="grid-content1 bg-purple-light"></div></xu-col>
          </xu-row>
          <xu-row class="row-class">
            <xu-col :span="6" :offset="6" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
            <xu-col :span="6" :offset="6" class="col-class"><div class="grid-content1 bg-purple-light"></div></xu-col>
          </xu-row>
        </div>
      </showExample>
    </div>

    <div class="content-item">
      <h3 class="content-topic">flex布局实现对齐</h3>
      <p></p>
      <showExample>
        <div class="content-example">
          <xu-row type="flex" class="row-class">
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple-light"></div></xu-col>
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
          </xu-row>
          <xu-row type="flex" justify="center" class="row-class">
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple-light"></div></xu-col>
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
          </xu-row>
          <xu-row type="flex" justify="end" class="row-class">
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple-light"></div></xu-col>
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
          </xu-row>
          <xu-row type="flex" justify="space-between" class="row-class">
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple-light"></div></xu-col>
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
          </xu-row>
          <xu-row type="flex" justify="space-around" class="row-class">
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple-light"></div></xu-col>
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
          </xu-row>
        </div>
      </showExample>
    </div>
    <div class="content-item">
      <h3 class="content-topic">响应式布局</h3>
      <p>设计了5个响应尺寸：<code>xs</code>、<code>sm</code>、<code>md</code>、<code>lg</code>、<code>xl</code></p>
      <showExample>
        <div class="content-example">
          <xu-row class="row-class">
            <xu-col :span="6" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
            <xu-col :span="6" :offset="6" class="col-class"><div class="grid-content1 bg-purple-light"></div></xu-col>
          </xu-row>
          <xu-row class="row-class">
            <xu-col :span="6" :offset="6" class="col-class"><div class="grid-content1 bg-purple"></div></xu-col>
            <xu-col :span="6" :offset="6" class="col-class"><div class="grid-content1 bg-purple-light"></div></xu-col>
          </xu-row>
        </div>
      </showExample>
    </div>
  </div>
</template>

<script>
import showExample from 'business-comp/demo-box';
import Row from 'basic-comp/layout/row/row.vue';
import Col from 'basic-comp/layout/col/col.vue';

export default {
  components: {
    showExample,
    'xu-row': Row,
    'xu-col': Col,
  },
};
</script>

<style lang="scss">
// 定义的几种颜色类
.bg-purple-dark {
    background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}

// 内容的基本样式类
.grid-content1 {
  height: 30px;
  border-radius: 5px;
}
.row-class {
  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  }
  .col-class {
    border-radius: 5px;
  }
}

</style>
