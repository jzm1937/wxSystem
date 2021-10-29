Page({
  data: {
    hideAlert: true,
    name: "",
    mobile: "",
    address: "",
    description: "",
    remarks: ""
  },

  getName: function (e) {
    var val = e.detail.value
    this.setData({
      name: val,
      hideAlert: true
    });
  },
  getMobile: function (e) {
    var val = e.detail.value
    this.setData({
      mobile: val,
      hideAlert: true

    });
  },
  getAddress: function (e) {
    var val = e.detail.value
    this.setData({
      address: val,
      hideAlert: true
    });
  },
  getDescription: function (e) {
    var val = e.detail.value
    this.setData({
      description: val,
      hideAlert: true
    });

  },
  getRemarks: function (e) {
    var val = e.detail.value
    this.setData({
      remarks: val
    });
  },

  handleClick: function (e) {
    if (this.data.name == '') {
      this.setData({
        hideAlert: false,
        message: "请输入申请人姓名"
      })
      return
    }
    if (this.data.mobile == '') {
      this.setData({
        hideAlert: false,
        message: "请输入联系电话"
      })
      return
    } else if (!(/^1[3456789]\d{9}$/.test(this.data.mobile))) {
      this.setData({
        hideAlert: false,
        message: "请输入正确的电话"
      })
      return
    }

    if (this.data.address == '') {
      this.setData({
        hideAlert: false,
        message: "输入故障地点"
      })
      return
    }
    if (this.data.description == '') {
      this.setData({
        hideAlert: false,
        message: "请输入问题描述"
      })
      return
    }

    var that = this;

    wx.showModal({
      title: '是否提交?',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '提交',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          that.submitData()
        }
      }
    });



  },
  submitData: function (e) {
    let db = wx.cloud.database();
    let orders = db.collection('orders')
    let date = new Date();
    let time = date.getFullYear().toString() + "." + (date.getMonth() + 1) + "." + date.getUTCDate() + " " + (date.getHours()) + ":" + (date.getMinutes()) + ":" + (date.getSeconds());
    orders.add({
      data: {
        name: this.data.name,
        mobile: this.data.mobile,
        address: this.data.address,
        description: this.data.description,
        remarks: this.data.remarks,
        date: time,
        status: "待处理"
      }
    }).then(res => {
      if (res._id) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          mask: true,
        });
      }

      this.setData({
        hideAlert: true,
        name: "",
        mobile: "",
        address: "",
        description: "",
        remarks: ""
      })
    }).catch(err => {
      wx.showToast({
        title: '提交失败',
        icon: 'error',
        mask: true
      });
    })
  }
})