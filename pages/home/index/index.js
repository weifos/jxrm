// miniprogram/pages/home/home.js
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
    cat: [
      {
        cname: '山货',
        desc: '山货海货，即时享受',
        banner: '../../../images/index/bn2.jpg',
        merchant: [
          {
            name: '商家1',
            img: '../../../images/index/i1.jpg',
            id: 1
          },
          {
            name: '商家1',
            img: '../../../images/index/i1.jpg',
            id: 1
          },
          {
            name: '商家1',
            img: '../../../images/index/i1.jpg',
            id: 1
          },
          {
            name: '商家1',
            img: '../../../images/index/i1.jpg',
            id: 1
          },
          {
            name: '商家1商家1商家1商家1商家1商家1',
            img: '../../../images/index/i1.jpg',
            id: 1
          },
          {
            name: '商家1',
            img: '../../../images/index/i1.jpg',
            id: 1
          },
        ]
      },
      {
        cname: '水产',
        desc: '新鲜海货，即时享受',
        banner: '../../../images/index/bn1.jpg',
        merchant: [
          {
            name: '商家1',
            img: '../../../images/index/i1.jpg',
            id: 1
          },
          {
            name: '商家1',
            img: '../../../images/index/i1.jpg',
            id: 1
          },
          {
            name: '商家1',
            img: '../../../images/index/i1.jpg',
            id: 1
          },
          {
            name: '商家1',
            img: '../../../images/index/i1.jpg',
            id: 1
          },
          {
            name: '商家1商家1商家1商家1商家1商家1',
            img: '../../../images/index/i1.jpg',
            id: 1
          },
          {
            name: '商家1',
            img: '../../../images/index/i1.jpg',
            id: 1
          },
        ]
      },
      {
        cname: '生鲜',
        desc: '新鲜海货，即时享受',
        banner: '../../../images/index/bn1.jpg',
        merchant: [
          {
            name: '商家1',
            img: '../../../images/index/i1.jpg',
            id: 1
          },
          {
            name: '商家1',
            img: '../../../images/index/i1.jpg',
            id: 1
          },
          {
            name: '商家1',
            img: '../../../images/index/i1.jpg',
            id: 1
          },
          {
            name: '商家1',
            img: '../../../images/index/i1.jpg',
            id: 1
          },
          {
            name: '商家1商家1商家1商家1商家1商家1',
            img: '../../../images/index/i1.jpg',
            id: 1
          },
          {
            name: '商家1',
            img: '../../../images/index/i1.jpg',
            id: 1
          },
        ]
      },
    ]
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

  bindMerchantJump: function (event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../../pages/shop/shop?id='+id,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  topageList:function(){
    wx.navigateTo({
      url: '../list/list',
    })
  },
  topageSearch:function(){
    wx.navigateTo({
      url: '../search/search',
    })
  }
})