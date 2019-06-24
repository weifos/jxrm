// miniprogram/pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skeyword:'', //搜索输入

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  topageResult:function(){
    wx.navigateTo({
      url: '../resultList/resultList',
    })
  },
  topageList: function () {
    wx.navigateTo({
      url: '../list/list',
    })
  },
  //input双向数据绑定
  inputedit: function (e) {
    let this_ = this;
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value.replace(/\s+/g, '');
    let names = dataset.name;
    this_.data[names] = value;
    this_.setData({
      [names]: this_.data[names]
    })
  }
})