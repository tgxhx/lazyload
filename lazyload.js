/**
 * Created by tgxh on 2017/6/24.
 */
;(function () {
  var imgs = document.querySelectorAll('img.lazyload'),
    option = {
      delay: 500, //延迟
      time: 1000  //滚动间隔
    },
    n = 0   //从第n个开始，防止滚动到一定距离时又从第一张图片开始设置src

  //判断类型
  function getType(obj) {
    return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1]
  }

  function lazyload() {
    var clientHeight = document.documentElement.clientHeight,
      scrollTop = document.body.scrollTop

    for (var i = n; i < imgs.length; i++) {
      //判断图片距离页面顶部的距离和窗口可见高度加滚动高度的大小
      if (imgs[i].offsetTop < clientHeight + scrollTop) {
        if (imgs[i].getAttribute('src') !== '') {
          imgs[i].src = imgs[i].getAttribute('data-src')
          n++
        }
      }
    }
  }

  //节流函数，限制触发频率
  function throttle(fun, delay, time) {
    var timer,
      startTime = new Date()

    //使用闭包设置私有变量
    return function () {
      var context = this,
        args = arguments,
        curTime = new Date()
      clearTimeout(timer)
      //比较两次滚动时间的间隔是否大于设置的频率
      if (curTime - startTime >= time) {
        fun.call(context, args)
        startTime = curTime
      } else {
        timer = setTimeout(fun, delay)
      }
    }
  }

  var api = {
    config: function (ops) {
      if (!ops) return option
      for (var k in ops) {
        option[k] = ops[k]
      }
      return this
    },
    listen: function () {
      lazyload()
      window.addEventListener('scroll', throttle(lazyload, option.delay, option.time))
      return this
    }
  }

  this.Lazyload = api
})()