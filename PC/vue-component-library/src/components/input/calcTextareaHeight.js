/*
 calcTextareaHeight函数的作用：计算textarea的高度
 */

let hiddenTextarea;

// 隐藏元素的style样式
const HIDDEN_STYLE = `
  height: 0 !important;
  visibility: hidden !important;
  overflow: hidden !important;
  position: absolute !important;
  z-index: -1000 !important;
  top: 0 !important;
  right: 0 !important;
`;

// 文本样式名
const CONTEXT_STYLE = [
  'letter-space',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
]


// 获取目标元素的内联样式
function calculateNodeStyling(targetElement) {
  const style = window.getComputedStyle(targetElement);

  // 获取该元素的盒模型
  const boxSizing = style.getPropertyValue('box-sizing');
  // 获取该元素的padding值
  const paddingSize = (parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top')));
  // 获取该元素的border值
  const borderSize = (parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width')));
  // 获取该元素的文本样式
  const contextStyle = CONTEXT_STYLE.map(name => `${name}:${style.getPropertyValue(name)}`).join(';');

  return { contextStyle, paddingSize, borderSize, boxSizing };
}


export default function calcTextareaHeight(targetElement, minRows=1, maxRows=null) {
  // 创建一个备用的textarea元素，用来计算textarea元素在不同情况下的高度值
  if(!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  let { paddingSize, borderSize, boxSizing, contextStyle } = calculateNodeStyling(targetElement);

  hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`);

  // 计算一个新的textarea内容与真的当前textarea内容相同时的高度
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || '';
  let height = hiddenTextarea.scrollHeight;
  const result = {};

  if(boxSizing === 'border-box') {
    height = height + borderSize;
  } else if (boxSizing === 'content-box') {
    height = height - paddingSize;
  }

  // 计算textarea在只有一行内容时的高度
  hiddenTextarea.value = '';
  let singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;


  if(minRows !== null) {
    let minHeight = singleRowHeight*minRows;
    if(boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    result.minHeight = `${minHeight} px`;
  }

  if(maxRows !== null) {
    let maxHeight = singleRowHeight*maxRows;
    if(boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height);
  }

  result.height = `${height}px`;
  hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea);
  hiddenTextarea = null;
  return result;
}
