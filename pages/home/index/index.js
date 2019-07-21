var api = require("../../../modules/api.js")
var router = require("../../../modules/router.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //快速登录
    showFlag: false, 
    banners: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    cat: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.api_200()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function(e) {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 查看门店详情
   */
  goStore: function(event) {
    let id = event.currentTarget.dataset.id
    router.goUrl({
      url: '../shop/details/details?id=' + id,
    })
  },
  /**
   * 加载首页数据
   */
  api_200: function() {
    var this_ = this;
    wx.post(api.api_200, wx.GetSign(), function(app, res) {
      if (res.data.Basis.State != api.state.state_200) {
        wx.showToast({
          title: res.data.Basis.Msg,
          icon: 'none',
          duration: 3000
        })
      } else {
        this_.setData({
          banners: res.data.Result.banners
        })
        this_.setData({
          cat: res.data.Result.stores
        })
      }
    });
  }
})