<template>
  <div id="app">
    <div id="headerBar">
      <!-- <h1 class="headerBar_title">maplexu组件库（Vue实现）</h1> -->
      <h1 class="headerBar_title">maplexu</h1>
      <div class="colorPicker">

      </div>
    </div>
    <div id="leftNav">
      <ul class="navList">
        <li v-for="item in navList" :key="item.title" class="navItem">
          <h3>{{item.title}}</h3>
          <p v-for="item2 in item.list" @click="select(item2.page)" :class="{ selectedItem: item2.page === selectedItem }">{{item2.name}}</p>
        </li>
      </ul>
    </div>
    <div class="rightContainer">
      <router-view/>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: '',
  data() {
    return {
      selectedItem: '',
      navList: [
        {
          title: '基础',
          list: [
            {name: 'Layout布局', page: 'layout'},
            {name: 'Icon图标', page: 'icon'},
            {name: 'Button按钮', page: 'button'}
          ]
        },
        {
          title: '表单',
          list: [
            {name: 'Radio单选框', page: 'radio'},
            {name: 'Checkbox多选框', page: 'checkbox'},
            {name: 'Input输入框', page: 'input'},
            {name: 'InputNumber计数器', page: 'inputNumber'},
            {name: 'Select选择器', page: 'select'},
            {name: 'Cascader级联选择器', page: 'cascader'},
            {name: 'Switch开关', page: 'switch'},
            {name: 'Slider滑块', page: 'slider'},
            {name: 'TimePicker时间选择器', page: 'timePicker'},
            {name: 'DatePicker日期选择器', page: 'datePicker'},
            {name: 'DateTimepicker日期时间选择器', page: 'dateTimePicker'},
            {name: 'Upload上传', page: 'upload'},
            {name: 'Rate评分', page: 'rate'},
            {name: 'ColorPicker颜色选择器', page: 'colorPicker'},
            {name: 'Transfer穿梭框', page: 'transfer'},
            {name: 'Form表单', page: 'form'}
          ]
        },
        {
          title: '数据',
          list: [
            {name: 'Table表格', page: 'table'},
            {name: 'Tag标签', page: 'tag'},
            {name: 'Progress进度条', page: 'progress'},
            {name: 'Tree树形控件', dynamic_pages: 'tree'},
            {name: 'Pagination分页', page: 'pagination'},
            {name: 'Badge标记', page: 'badge'}
          ]
        },
        {
          title: '通知',
          list: [
            {name: 'Alert警告', page: 'alert'},
            {name: 'Loading加载', page: 'loading'},
            {name: 'Message消息提示', page: 'message'},
            {name: 'MessageBox弹窗', page: 'messageBox'},
            {name: 'Notification通知', page: 'notification'}
          ]
        },
        {
          title: '导航',
          list: [
            {name: 'NavMenu导航菜单', page: 'navMenu'},
            {name: 'Tabs标签页', page: 'tabs'},
            {name: 'BreadCrumb面包屑', page: 'breadCrumb'},
            {name: 'Dropdown下拉菜单', page: 'dropdown'},
            {name: 'Steps步骤条', page: 'steps'}
          ]
        },
        {
          title: '其他',
          list: [
            {name: 'Dialog对话框', page: 'dialog'},
            {name: 'Tooltip文字提示', page: 'tooltip'},
            {name: 'Popover弹出框', page: 'popover'},
            {name: 'Card卡片', page: 'card'},
            {name: 'Carousel走马灯', page: 'carousel'},
            {name: 'Collapse折叠面板', page: 'collapse'}
          ]
        }
      ]
    }
  },
  methods: {
    select(page){
      this.selectedItem = page;
      this.$router.push('/' + page);
    }
  },
  mounted(){
    if(this.$route && this.$route.path !== '/') {
      this.selectedItem = this.$route.path.substr('1');
    }
  }
}
</script>

<style lang="scss">
// @import "./styles/main.scss";
// @import "./styles/icon.css";

// 页面中所有地方都使用该自定义滚动条样式（针对webkit内核）
::-webkit-scrollbar {
  width: 3px;
  background-color: #eee;
}
::-webkit-scrollbar-thumb {
  display: none;
  background: #409EFF;
}
::-webkit-scrollbar-track-piece {
  background: #fff;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  #headerBar {
    display: flex;
    height: 80px;
    background: #fff;
    align-items: center;
    .headerBar_title {
      flex: 1;
      padding-left: 60px;
      text-align: left;
      font-size: 30px;
      color: #409EFF;
    }
    .colorPicker {
      width: 30px;
      height: 30px;
      margin-right: 60px;
      background: #409EFF;
      cursor: pointer;
    }
  }
  #leftNav {
    position: fixed;
    top: 80px;
    left: 0;
    bottom: 0;
    width: 330px;
    overflow-y: auto;
    .navList {
      list-style: none;
      padding: 0 0 20px 60px;
      text-align: left;
      .navItem {
        h3 {
          padding: 20px 0;
          font-size: 24px;
        }
        p {
          padding: 0;
          margin-bottom: 15px;
          font-size: 14px;
          line-height: 1.5;
          color: #7f8c8d;
          cursor: pointer;
          &:hover {
            color: #409EFF;
            font-weight: bold;
          }
        }
        .selectedItem {
          color: #409EFF;
          font-weight: bold;
        }
      }
    }
    &:hover {
      &::-webkit-scrollbar-thumb {
        display: block;
      }
    }
  }
  .rightContainer {
    position: fixed;
    top: 80px;
    left: 360px;
    bottom: 0;
    right: 0;
    padding: 10px 20px 50px;
    overflow: auto;

    .content-title {
      font-size: 30px;
      font-weight: 400;
      font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    }
    p{
      font-size: 14px;
      color: #5e6d82;
      padding: 10px 0;
      line-height: 1.5em;
    }
    &:hover {
      &::-webkit-scrollbar-thumb {
        display: block;
      }
    }
  }
}


</style>
