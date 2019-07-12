// pages/cateList/cateList.js
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
    imgUrls: [
      'https://img.alicdn.com/imgextra/i4/2453833909/TB1t9Awi5AnBKNjSZFvXXaTKXXa_!!0-item_pic.jpg_430x430q90.jpg',
      'https://img.alicdn.com/imgextra/i4/2453833909/TB1t9Awi5AnBKNjSZFvXXaTKXXa_!!0-item_pic.jpg_430x430q90.jpg',
      'https://img.alicdn.com/imgextra/i4/2453833909/TB1t9Awi5AnBKNjSZFvXXaTKXXa_!!0-item_pic.jpg_430x430q90.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    cateList:[
      {
        classifysName:'山货',
        cateClassify:[
          '山货分类1山货分类1山货分类1山货分类1',
           '山货分类1',
           '山货分类1',
           '山货分类1',
           '山货分类1',
           '山货分类1',
        ]
      }
    ],
    cateContent:[
      {
        name: '商家1',
        img: '../../images/index/bn2.jpg',
        desc: '商家1商家1商家1商家1商家1商家1商家1商家1商家1商家1商家1商家1商家1商家1商家1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        id:1
      },
      {
        name: '商家1',
        img: '../../images/index/bn2.jpg',
        desc: 'aaaaaaaaaaaaaaaaaaaaaaaaa',
        id: 1
      },
      {
        name: '商家1',
        img: '../../images/index/bn2.jpg',
        desc: 'aaaaaaaaaaaaaaaaaaaaaaaaa',
        id: 1
        
      },
      {
        name: '商家1',
        img: '../../images/index/bn2.jpg',
        desc: 'aaaaaaaaaaaaaaaaaaaaaaaaa',
        id: 1
      },
      {
        name: '商家1',
        img: '../../images/index/bn2.jpg',
        desc: 'aaaaaaaaaaaaaaaaaaaaaaaaa',
        id: 1
      },
      {
        name: '商家1',
        img: '../../images/index/bn2.jpg',
        desc: 'aaaaaaaaaaaaaaaaaaaaaaaaa',
        id: 1
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
   * 查看门店详情
   */
    goStore: function (event) {
      let id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: '../home/productDetail/productDetail?id=' + id,
      })
    },
  }
  
})
