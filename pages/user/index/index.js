//index.js
//请求js
var ajax = require("../../.././utils/ajax.js")
var common = require("../../.././modules/passport.js")
//应用实列
const app = getApp()

Page({
  data: {
   
  },

  onLoad: function() {   
   // console.log(ajax, app.globalData.userInfo,ajax.requestHandler.token)
  
  },
 
  //跳转个人中心
  topageMy:function(){
    wx.navigateTo({
      url: '../my/my'
    })
  }, 
  //跳转还书单
  topageFinishOrder: function() {
    wx.navigateTo({
      url: '../finishOrder/finishOrder'
    })
  },
  //跳转搜索
  topageHome:function(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  scanCode:function(){
    // 允许从相机和相册扫码
    wx.scanCode({
      success(res) {
        console.log(res)       
        if (res.result){
          console.log('获取到的编码是',res.result)
          
        }
      }
    })
  }
  
               
})
