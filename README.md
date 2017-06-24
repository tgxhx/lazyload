## 基于原生javascript的一个简单图片懒加载插件
通过检测img标签的offsetTop，并判断与clientHeight加scrollTop的大小来显示图片，为了避免高频率触发事件函数，引入了节流函数来限制频率

Usage
---
可以自定义图片显示的延迟和滚动时触发的频率
```js
Lazyload.config({
  delay: 300,  //显示延迟，默认500ms
  time: 1000  //触发频率
})
```
