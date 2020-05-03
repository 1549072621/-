Page({

  /**
   * 页面的初始数据
   * auth：晚空
   * QQ：1549072621
   */
  data: {
    result: null,
    topicShow: false,
    showId: 0,
    resultHidden: true, //获取成功后显示的
  },
  formReset: function (e) {
    let that = this;
    that.setData({
      resultShow: true,
    })
  },
  gotohelp() {
    console.log("点击了帮助");
    wx.navigateTo({
      url: '/pages/index/help/help',
    })
  },

  GetRequest(e) {
    let that = this
    wx.showLoading({
      title: '搜索中...',
      mask: true,
    })
    let question = e;
    wx.request({
      method: 'GET',
      url: 'https://ct.mmifx.com/api.php',
      data: {
        token: '071ee7cd5442296867e547b4e817179bf11e51e5',
        question: question
      },
      success(res) {
        // console.log(res.data.msg);
        //console.log(res.data.question2);
        that.setData({
          result: res.data.msg,
          resultHidden: false
        })
      },
      complete() {
        wx.hideLoading();
      }
    })
  },
  Tocopy(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.msg,
      success(res) {}
    })
  },
  formSubmit: function (e) {
    let that = this;
    //判断输入框内容是否为空
    if (e.detail.value.input === '') {
      //当输入框内内容为空时
      that.setData({
        topicShow: true
      })
    } else {
      that.GetRequest(e.detail.value.input);
    }
  },
  GetCopy() {
    let that = this;
    wx.getClipboardData({
      success(res) {
        if (res.data !== '') {
          wx.showModal({
            title: '检测到剪切板内容，是否搜索？',
            content: res.data,
            cancelText: '取消',
            confirmText: '搜索',
            success(resyes) {
              if (resyes.confirm) {
                that.GetRequest(res.data);
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
  panel: function (e) {
    if (e.currentTarget.dataset.id != this.data.showId) {
      this.setData({
        showId: e.currentTarget.dataset.id
      })
    } else {
      this.setData({
        showId: -1
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("晚空QQ：1549072621");
    //这句话并不会被用户看到。可以的话，留个版权。
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
    this.GetCopy();
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