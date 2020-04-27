// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const imgRes = await cloud.openapi.security.imgSecCheck({
      media: {
        header: {'Content-Type': 'application/octet-stream'},
        contentType: 'image/png',
        value: Buffer.from(event.value)
      }
    })
    console.log(11111111111)
    return imgRes
  } catch (error) {
    return error
  }
}