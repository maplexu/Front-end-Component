<template>
  <div class="demo-box">
    <div class="info">
      <h2></h2>
      <div></div>
    </div>

    <div class="preview">
      
    </div>

    <div class="code">
      <div class="code__description">

      </div>
      <div class="code__highlight">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  methods: {

  },
};
</script>

<style lang="scss">
.demo-box {
  border: 1px solid #ebebeb;
  &:hover {
    box-shadow: 0 0 1px #409EFF;
  }
  .preview {

  }
  .code {

  }
}
</style>
