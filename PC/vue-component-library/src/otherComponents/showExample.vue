<template lang="html">
  <div class="codeContainer">
    <slot></slot>
    <div class="codeBody" style="height: 0">
        <div class="codeWrapper">
          <pre>
            <slot name="code"></slot>
          </pre>
        </div>
      </div>
    <!-- <div class="codeBtn" @click="openDetail">
      {{ isOpending ? '隐藏代码' : '显示代码'}}
    </div> -->
  </div>
</template>

<script>
export default {
  mounted() {

  },
  props: ['code'],
  data() {
    return {
      isOpending: false
    };
  },
  methods: {
    openDetail() {
      // 注意，这里的动画不能搭配vue的动画来实现，因为vue动画切换过程中，子元素会消失掉，就拿不到子元素的高度了
      let codeBody = document.querySelector('.codeBody');
      let codeWrapper = document.querySelector('.codeWrapper');

      if(this.isOpending) {
        codeBody.style.height = 0;
      } else {
        codeBody.style.height = codeWrapper.offsetHeight + 'px';
      }
      this.isOpending = !this.isOpending;
    }
  }
}
</script>

<style lang="scss">
.codeContainer {
  border: 1px solid #ebebeb;
  &:hover {
    box-shadow: 0 0 1px #409EFF;
  }
  .codeBody {
    background: #f9f9f9;
    overflow: hidden;
    transition: 0.5s all ease;
  }
  .codeBtn {
    height: 50px;
    border-top: 1px solid #ebebeb;
    line-height: 50px;
    text-align: center;
    font-size: 12px;
    color: #d3dce6;
    cursor: pointer;
    &:hover {
      color: #409EFF;
      background-color: #f9fafc;
    }
  }
}
</style>
