<template>
  <div class="demo-box">
    <div class="introduction">
      <h2>{{title}}</h2>
      <div>
        {{description}}
      </div>
    </div>

    <div class="preview">
      <slot></slot>
    </div>

    <div class="code" v-highlight>
      <pre>
        <!-- <code v-highlight v-html="$slots.default[0]"></code> -->
        <code>function() {
          var a = '123';
          console.log(a);
        }
        </code>
      </pre>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('打印slot的内容', this.$slots);
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
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

  .introduction {

  }
  .preview {

  }
  .code {

  }
}
</style>
