// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"pyb-database-n2c6s"
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('notification')
  .orderBy('date','desc')
  .get()
    
}