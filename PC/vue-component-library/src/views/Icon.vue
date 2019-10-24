<template lang="html">
  <div class="">
    <h2 class="content-title">Icon图标</h2>

    <div class="content-item">
      <h3 class="content-topic">使用方式1：通过类名来使用</h3>
      <p>直接设置类名来使用，例如<code>xu-icon-iconName</code></p>
      <showExample>
        <div class="content-example">
          <i class="icon icon-1 xu-icon-edit"></i>
          <i class="icon icon-2 xu-icon-share"></i>
          <i class="icon icon-3 xu-icon-delete"></i>
          <i class="icon icon-4 xu-icon-loading"></i>
        </div>
      </showExample>
    </div>
    <div class="content-item">
      <h3 class="content-topic">使用方式2：通过组件形式</h3>
      <p>使用<code>&#60;xu-icon&#62;</code>组件，组件的<code>name</code>属性填入想要的图标名</p>
      <showExample>
        <div class="content-example">
          <xu-icon class="icon icon-1" name="edit"></xu-icon>
          <xu-icon class="icon icon-2" name="share"></xu-icon>
          <xu-icon class="icon icon-3" name="delete"></xu-icon>
          <xu-icon class="icon icon-4" name="loading"></xu-icon>
        </div>
      </showExample>
    </div>
  </div>
</template>

<script>
import showExample from '../otherComponents/showExample';
import Icon from '../components/icon/icon.vue'

export default {
  components: {
    showExample,
    'xu-icon': Icon
  }
}
</script>

<style lang="scss" scoped>
.icon {
  margin: 0 20px;
  vertical-align: middle;             // 让图标元素在垂直居中
}
.icon-1 {
  color: #409EFF;
  font-size: 36px;
}
.icon-2 {
  color: #F1ED1B;
  font-size: 30px;
}
.icon-3 {
  color: #11E00E;
  font-size: 24px;
}
.icon-4 {
  color: #E40D0D;
  font-size: 18px;
}
</style>
