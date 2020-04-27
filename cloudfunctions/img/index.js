// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return await cloud.openapi.security.imgSecCheck({
    media:{
      header:{'content-type':'application/octe-stream'},
      contentType:'image/png',
      value:Buffer.from(event.value)
    }
  })
}