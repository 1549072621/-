// pages/tool/tools/dyqsy/dyqsy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dyurl: null,
    dydata: null,
    dyvideo: null,
    topicShow: false, //当链接为空时，提示错误
    resultShow: false, //获取成功后显示的
  },
  formSubmit: function (e) {
    let that=this
    let dyurl = encodeURIComponent(e.detail.value.input);
    if (dyurl === '') {
      //如果链接为空，显示顶部提示字体
      that.setData({
        topicShow: true
      })
    }
    //链接正常，进入服务器步骤
    else {
      wx.request({
        header: {
          'content-type': 'application/json' // 默认值
        },
        url: 'https://wx.mmifx.com/tools/dyqsy/ajax.php?act=dy&url=' + dyurl,
        dataType: 'json',
        success(res) {
          let dydata = res.data;
          //赋值，将值挨个赋值
          that.setData({
            dyvideo: dydata.url,
            //显示结果框
            resultShow: true,
          })
        }
      })
    }
  },
  GoToHelp() {
    wx.navigateTo({
      url: 'help/help',
    })
  },
  CopyLink() {
    wx.setClipboardData({
      data: this.data.dyvideo,
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.showToast({
              title: '复制成功,请打开浏览器下载。',
              icon: 'none'
            })
          }
        })
      }
    })
  },
  SaveVideo() {
    console.log(this.data.dyvideo);
    wx.saveVideoToPhotosAlbum({
      filePath:this.data.dyvideo
    })
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

  }
})