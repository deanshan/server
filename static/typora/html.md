### 拖拽(draggable)

+ 规定元素是否可以拖动,属性值为布尔值draggable=true，默认为false
+ 被拖拽的元素（事件作用于被拖拽元素上）
  + ondragstart ：当拖拽元素开始被拖拽的时候触发
  + ondrag :  拖拽过程中触发
  + ondragend ：当拖拽完成后触发
+ 目标元素（即被拖拽元素最后放置的地方）
  + ondragenter ：当拖曳元素进入目标元素的时候触发
  + ondragover  ：拖拽元素在目标元素上移动的时候触发
  + ondragleave  ：拖拽元素在离开目标元素的时候触发
  + ondrop       ：被拖拽的元素在目标元素上释放的时候触发
+ DataTransfer 对象：拖拽对象用来传递的媒介，使用一般为e.dataTransfer。
+ e.preventDefault()方法：阻止默认的些事件方法等执行。在ondragover中一定要执行preventDefault(),

否则ondrop事件不会被触发。另外，如果是从其他应用软件或是文件中拖东西进来，尤其是图片的时候，默认的动作是显示这个图片或是相关信息，并不是真的执行drop。此时需要用document的ondragover事件把它直接干掉。

+ e.stopPropagation()方法：阻止事件冒泡

+ return false：在事件最后加，可以阻止事件冒泡和默认操作

+ e.effectAllowed 属性：就是拖拽的效果