// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"project-database-v58ji"
})

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var request = event.request
  if (request == "get_des") {
    return await db.collection('expression')
    .where({
      public:true
    })
    .orderBy('des_num', 'asc')
    .limit(2)
    .get()
  }
  if (request == "get_tag") {
    return await db.collection('expression')
    .where({
      public:true
    })
    .orderBy('tag_num', 'asc')
    .limit(3)
    .get()
  }
  if (request == "add_des") {
    var id = event.id
    var des = event.des
    await db.collection("expression").where({
      _id:id
    }).update({
      data: {
        description:_.push(des),
        des_num:_.inc(1)
      }
    })
  }
  if (request == "add_tag") {
    var id = event.id
    var tags = event.tags
    var addr
    
    for (tag in tags) {
      await db.collection("expression").where({
        _id:id
      }).update({
        data: {
          ["tags." + tags[tag]]:_.inc(1),
          tag_num:_.inc(1)
        }
      })
      
      // return tag
      let is_have = await db.collection('tags')
      .where({
        name:tags[tag]
      }).get()
      console.log("is have")
      console.log(is_have)
      if (
        is_have.data.length == 0
      ) 
      {
        await db.collection('tags').add({
          data:{
            name:tags[tag],
            expression_id:{}
          }
        })
      }

      addr = "expression_id."+id
      console.log("this is addr")
      console.log(addr)

      await db.collection('tags')
      .where({
        name:tags[tag]
      })
      .update({
        data:{
          [addr]:_.inc(1)
        }
      })
    }
  }
  if (request == "get_tags") {
    var id = event.id
    return await db.collection("expression").where({
      _id:id
    })
    .get()
  }
  if (request == "get_url") {
    var id = event.id
    return await db.collection("expression").where({
      _id:id
    })
    .get()
  }
  if (request == "search_by_tag") {
    var tag_name = event.tag_name
    return await db.collection("tags")
    .where({
      name:tag_name
    })
    .get()
  }
}