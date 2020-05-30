/**
 * 导航栏配置
*/
const nav = [
  {
    name: '基础',
    
    children: [
      { name: 'Layout布局', page: 'layout' },
      { name: 'Icon图标', page: 'icon' },
      { name: 'Button按钮', page: 'button' },
    ],
  },
  {
    name: '表单',
    children: [
      { name: 'Radio单选框', page: 'radio' },
      { name: 'Checkbox多选框', page: 'checkbox' },
      { name: 'Input输入框', page: 'input' },
      { name: 'InputNumber计数器', page: 'inputNumber' },
      { name: 'Select选择器', page: 'select' },
      { name: 'Cascader级联选择器', page: 'cascader' },
      { name: 'Switch开关', page: 'switch' },
      { name: 'Slider滑块', page: 'slider' },
      { name: 'TimePicker时间选择器', page: 'timePicker' },
      { name: 'DatePicker日期选择器', page: 'datePicker' },
      { name: 'DateTimepicker日期时间选择器', page: 'dateTimePicker' },
      { name: 'Upload上传', page: 'upload' },
      { name: 'Rate评分', page: 'rate' },
      { name: 'ColorPicker颜色选择器', page: 'colorPicker' },
      { name: 'Transfer穿梭框', page: 'transfer' },
      { name: 'Form表单', page: 'form' },
    ],
  },
  {
    name: '数据',
    children: [
      { name: 'Table表格', page: 'table' },
      { name: 'Tag标签', page: 'tag' },
      { name: 'Progress进度条', page: 'progress' },
      { name: 'Tree树形控件', dynamic_pages: 'tree' },
      { name: 'Pagination分页', page: 'pagination' },
      { name: 'Badge标记', page: 'badge' },
    ],
  },
  {
    name: '通知',
    children: [
      { name: 'Alert警告', page: 'alert' },
      { name: 'Loading加载', page: 'loading' },
      { name: 'Message消息提示', page: 'message' },
      { name: 'MessageBox弹窗', page: 'messageBox' },
      { name: 'Notification通知', page: 'notification' },
    ],
  },
  {
    name: '导航',
    children: [
      { name: 'NavMenu导航菜单', page: 'navMenu' },
      { name: 'Tabs标签页', page: 'tabs' },
      { name: 'BreadCrumb面包屑', page: 'breadCrumb' },
      { name: 'Dropdown下拉菜单', page: 'dropdown' },
      { name: 'Steps步骤条', page: 'steps' },
    ],
  },
  {
    name: '其他',
    children: [
      { name: 'Dialog对话框', page: 'dialog' },
      { name: 'Tooltip文字提示', page: 'tooltip' },
      { name: 'Popover弹出框', page: 'popover' },
      { name: 'Card卡片', page: 'card' },
      { name: 'Carousel走马灯', page: 'carousel' },
      { name: 'Collapse折叠面板', page: 'collapse' },
    ],
  },
];

export default nav;
