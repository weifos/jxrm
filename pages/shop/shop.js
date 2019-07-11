// pages/shop/shop.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    shopInfo:{
      id:1,
      name:'我的小菜铺',
      img:'../../images/index/i1.jpg',
      desc:'经营山货，小食等等经营山货，小食等等经营山货，小食等等经营山货，小食等等',
      products:[
        {
          id:1,
          name:'小蘑菇',
          img:'../../images/index/i1.jpg',
          price:12
        },
        {
          id: 111,
          name: '小蘑菇小蘑菇小蘑菇小蘑菇小蘑菇小蘑菇',
          img: '../../images/index/i1.jpg',
          price: 12
        },
        {
          id: 111,
          name: '小蘑菇',
          img: '../../images/index/i1.jpg',
          price: 12
        },
        {
          id: 111,
          name: '小蘑菇',
          img: '../../images/index/i1.jpg',
          price: 12
        },
      ]
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindProductJump(event){
      let id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: '../home/productDetail/productDetail?id=' + id
      })
    }
  },
  api_201: function () {
    var this_ = this;
    wx.post(api.api_201, wx.GetSign(), function (app, res) {
      if (res.data.Basis.State != api.state.state_200) {
        wx.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
      } else {
        this_.setData({ banners: res.data.Result.banners })
        this_.setData({ cat: res.data.Result.stores })
      }
    });
  }

})
