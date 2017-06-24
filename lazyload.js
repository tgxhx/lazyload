/**
 * Created by tgxh on 2017/6/24.
 */
;(function () {
  var imgs = document.querySelectorAll('img'),
    option = {
      delay: 500, //延迟
      time: 1000  //滚动间隔
    },
    n = 0   //从第n个开始

  function getType(obj) {
    return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1]
  }

  function lazyload() {
    var clientHeight = document.documentElement.clientHeight,
      scrollTop = document.body.scrollTop
    
    for (var i = n; i < imgs.length; i++) {
      if (imgs[i].offsetTop < clientHeight + scrollTop) {
        if (imgs[i].getAttribute('src') !== '') {
          imgs[i].src = imgs[i].getAttribute('data-src')
          n++
        }
      }
    }
    console.log('scroll')
  }

  function throttle(fun, delay, time) {
    var timer,
      startTime = new Date()

    return function () {
      var context = this,
        args = arguments,
        curTime = new Date()
      clearTimeout(timer)
      if (curTime - startTime >= time) {
        fun.call(context, args)
        startTime = curTime
      } else {
        timer = setTimeout(fun, delay)
      }
      console.log(delay + ' ' + time)
    }
  }

  var api = {
    config: function (ops) {
      if (!ops) return option
      for (var k in ops) {
        option[k] = ops[k]
        console.log(option[k])
      }
      console.log(ops)
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