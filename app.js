//身份认证脚本
var passport = require("./modules/passport.js")
var md5 = require("./utils/md5.js")
 
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    //passport.AuthLogin()
  },
  globalData: {
    userInfo: {},
    tostr(){

    }
  }
})


wx.post = function(url, data, cb, ch) {
  wx.showLoading({
    title: '请求中',
    mask: true
  });
  wx.request({
    url: url,
    data: data,
    method: "post",
    header: {
      //'content-type': methonType,
      //'token': requestHandler.token // 默认值
    },
    success: (res) => {
      wx.hideLoading()
      if (res.data.Basis != undefined && res.data.Basis.State == 205) {
        wx.showToast({
          title: res.data.Basis.Msg,
          icon: 'none',
          duration: 3000
        })
        //router.push({ path: "/passport/login" })
      } else {
        cb(this, res)
      }
    },
    fail: (res) => {
      setTimeout(function() {
        wx.hideLoading()
      }, 2000)
      wx.showToast({
        title: '网络错误',
        icon: 'none',
        duration: 3000
      })
      if (ch != undefined) {
        ch(err)
      }
    }
  })
}


//获取签名
wx.GetSign = function(obj = {}) {

  let {
    token
  } = ' '

  function sort(obj) {

    if (obj instanceof Array) {
      //如果数组里面存放的为对象,通过map更改数组结构，排序
      obj = obj.map((ele, index) => {
        if (ele instanceof Object) {
          var newObj = {}
          Object.keys(ele).sort().forEach(function(key) {
            var o = ele[key]
            if (o instanceof Object) {
              o = sort(o)
            }
            newObj[key] = o
          })
          ele = newObj
        }
        return ele
      })
      return obj
    }

    var newObj = {}
    Object.keys(obj).sort().forEach(function(key) {
      var o = obj[key]
      if (o instanceof Object) {
        o = sort(o)
      }
      newObj[key] = o
    })
    return newObj
  }

  const sign_data = {
    Data: obj,
    Global: {
      IMEI: "",
      IMSI: "",
      IP: "",
      OS: 3,
      Sign: "",
      Token: " "
    }
  }
  return {
    Data: obj,
    Global: {
      IMEI: "",
      IMSI: "",
      IP: "",
      OS: 3,
      Sign: md5.hexMD5(JSON.stringify(sort(sign_data)) + ')(4AzEdr5J6a`@#$*%'),
      Token: ' '
    }
  }
}
// module.exports = {
//   // GET: GET,
//   // POST: POST,
//   $ajax,
//   requestHandler
// }