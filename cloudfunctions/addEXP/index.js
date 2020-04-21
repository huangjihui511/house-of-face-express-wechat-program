// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = wx.cloud.database()
const _ = db.command
//传入两个参数 id（用户id），incNum（增加数量）
// 云函数入口函数
exports.main = async (event, context) => {
  db.collection('user').doc(event.id).update({
    data: {
      exp: _.inc(event.incNum)
    }
  })
}