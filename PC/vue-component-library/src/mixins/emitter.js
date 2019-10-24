/*
  增加两个方法，用于向父组件/子组件发出事件通知
 */

function broadcast(componentName, eventname, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName;

    if(name === componentName) {
      child.$emit.apply(child, [eventname].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventname].concat([params]));
    }
  });
}

export default {
  methods: {
    // 1.向上通知父组件，触发某个父组件的某个事件
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      // 如果未找到父组件，或者父组件不符合条件，则继续向上查找父组件
      while(parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if(parent) {
          name = parent.$options.componentName;
        }
      }

      if(parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    // 1.向下向子组件广播，触发子组件上的某个事件
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventname, params);
    }
  }
}
