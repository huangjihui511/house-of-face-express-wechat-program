const App = getApp()

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 公用的修改颜色
function changeColor(e, _this) {
  let tempData = {};
  tempData[e.target.dataset.color] = e.detail.value;
  console.log(tempData)
  _this.setData({
    [e.target.dataset.color]: e.detail.value,
    eraser: false,
  });
}

// 公用的修改画笔宽度
function changeWidth(e, _this) {
  _this.setData({
    w: e.detail.value,
    eraser: false,
  })
}

// 点击按钮触发的事件
function tapBtn(e, _this, pageType) {
  let btnType = e.target.dataset.type;

  let c = {};

  switch (btnType) {
    // 画笔宽度
    case 'width':
      if (pageType === 1) {
        c.canvasHeight = (!_this.data.width) ? 130 + _this.data.w : 50;
      } else if (pageType === 2) {
        c.canvasHeightLen = (!_this.data.width) ? Math.min(_this.data.canvasHeight, _this.data.windowHeight - _this.data.w - 130) : 0;
      } else if (pageType === 3) {
        c.canvasHeight = 130;
      }
      _this.setData({
        width: !_this.data.width,
        color: false,
        clear: false,
        ...c,
      });
      return;
    // 画笔颜色
    case 'color':
      if (pageType === 1) {
        c.canvasHeight = (!_this.data.color) ? 205 + _this.data.w : 50;
        if (_this.data.pageType === 'whiteBoard') {
          c.canvasHeight += 64;
        }
      } else if (pageType === 2) {
        c.canvasHeightLen = (!_this.data.color) ? Math.min(_this.data.canvasHeight, _this.data.windowHeight - _this.data.w - 205) : 0;
      }
      _this.setData({
        width: false,
        color: !_this.data.color,
        clear: false,
        ...c,
      });
      return;
    // 清空按钮
    case 'clear':
      c.canvasHeightLen = (!_this.data.clear) ? Math.min(_this.data.canvasHeight, _this.data.windowHeight - _this.data.w - 120) : 0;
      _this.setData({
        width: false,
        color: false,
        clear: !_this.data.clear,
        ...c,
      })
      _this.drawBack();
      return;
    // 保存
    case 'save':
      saveImg(_this, pageType);
      return
    default:
      return;
  }
}

function saveImg(_this, pageType) {
  let c = {};
  if (pageType === 1) {
    c.canvasHeight = 50;
  } else if (pageType === 2) {
    c.canvasHeightLen = 0;
  }
  
  // 关闭所有的操作栏
  _this.setData({
    width: false,
    color: false,
    clear: false,
    saving: true,
    ...c,
  })
   _canvaseSaveToImg(_this);
}

function _canvaseSaveToImg(_this) {
  // 调用微信canvas存为图片
  wx.canvasToTempFilePath({
    canvasId: 'myCanvas',
    success: function (res) {
      wx.showToast({
        title: '保存成功',
      })
      var pages = getCurrentPages();
      pages[pages.length-2].setData({
        curImage: res.tempFilePath
      })
    },
    fail: function (res) {
      wx.hideLoading();
      wx.showToast({
        icon: 'loading',
        title: '保存失败',
      })
    }
  })
}

function setEraser(_this) {
  _this.setData({
    eraser: !_this.data.eraser,
    clear: false,
    canvasHeight: 50
  });
}

module.exports = {
  formatTime: formatTime,
  changeColor: changeColor,
  changeWidth: changeWidth,
  tapBtn: tapBtn,
  setEraser: setEraser,
}
