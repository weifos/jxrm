// pages/home/productDetail/productDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://img.alicdn.com/imgextra/i4/2453833909/TB1t9Awi5AnBKNjSZFvXXaTKXXa_!!0-item_pic.jpg_430x430q90.jpg',
      'https://img.alicdn.com/imgextra/i4/2453833909/TB1t9Awi5AnBKNjSZFvXXaTKXXa_!!0-item_pic.jpg_430x430q90.jpg',
      'https://img.alicdn.com/imgextra/i4/2453833909/TB1t9Awi5AnBKNjSZFvXXaTKXXa_!!0-item_pic.jpg_430x430q90.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    tab:'0',
    collected:0,
    productInfo:{
      id:111,
      name:'小蘑菇',
      desc:"降低血中胆固醇，软化动脉血管",
      content:'dfafdsfafdafadfdasf降低血中胆固醇，软化动脉血管',
      shop:'公司名称：aaaaaa；公司地址：啊阿拉啦啦；服务热线：1223434'
    }
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

  bindTabClick: function (event){
    let id = event.currentTarget.dataset.id;
    this.setData({ tab: id });
  },
  bindCollectClick:function(){
    let collected = this.data.collected;
    if (collected == 0){
      this.setData({ collected: 1 });
    } else if (collected == 1){
      this.setData({ collected: 0 });
    }
  }
})