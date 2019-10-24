// 增加一个方法，让某个元素获取到焦点
export default function(ref) {
  return {
    methods: {
      focus() {
        this.$refs[ref].focus();
      }
    }
  }
}
