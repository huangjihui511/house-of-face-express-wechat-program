// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"project-database-v58ji"
})

const db = cloud.database()
const _ = db.command
//传入两个参数 id（用户id），incNum（增加数量）
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('user').where({
    open_id:event.id
  })
  .update({
    data: {
      labels:_.push(event.label)
    }
  })
  
}