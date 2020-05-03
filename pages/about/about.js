//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    xingbie: "欢迎您！",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tipsShow: false, // 公告显示
    tipsValue: null, //公告
    FirstStart: true, //判断是否是第一次开启
  },
  GetConfig() {
    let that = this;
    wx.request({
      method: "GET",
      url: 'https://wx.mmifx.com/api/config.php',
      success(res) {
        //远程公告开启
        if (res.data.tipscode === 1) {
          let tipsValue = res.data.tips;
          wx.showModal({
            title: tipsValue.title,
            content: tipsValue.msg,
            cancelText: tipsValue.left,
            confirmText: tipsValue.right,
            success(resyes) {
              if (resyes.confirm) {
                console.log('用户点击了确定按钮');
              }
              if (resyes.cancel) {
                console.log('用户点击了取消按钮');
              }
            }
          })
        }
      }
    })
  },
  GetUserInfo() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    if (userInfo.gender === 1) {
      this.setData({
        usergender: "帅气的小哥哥"
      })
    } else if (userInfo.gender === 2) {
      this.setData({
        usergender: "美丽的小姐姐"
      })
    }
  },
  linkFefu() {
    wx.setClipboardData({
      data: 'mmifx666',
      success() {
        wx.showToast({
          title: '微信号已复制，请自行搜索添加',
          icon:'none'
        })
      }
    })
  },
  linkQQ(){
    wx.setClipboardData({
      data: '594192423',
      success() {
        wx.showToast({
          title: 'QQ号已复制，请自行搜索添加',
          icon:'none'
        })
      }
    })
  },
  MustSee(){
    wx.navigateTo({
      url: 'mustsee/mustsee',
    })
  },
  AboutMe(){
    wx.navigateTo({
      url: 'aboutme/aboutme',
    })
  },
 AboutIt(){
    wx.navigateTo({
      url: 'aboutit/aboutit',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.GetUserInfo();
    this.GetConfig();
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

  }
})