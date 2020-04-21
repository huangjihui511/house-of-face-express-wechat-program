
const cloud = require('wx-server-sdk')

cloud.init({
  env:"pyb-database-n2c6s"
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  var request = event.request
  if (request == "add_expression") {
    var id = event.data1
    var file_id = event.data2
    var tags1 = event.data3
    try {
    return await db.collection('user').where({
      _id:id
    }).update({
      data:{
        expression_set:_.push([{file_id:file_id, times:0, tags:tags1}])
      },
    })
  } catch (e) {
    console.log(e)
  }
  }  else if (request == "add_picture") {
    var id = event.data1
    var time = event.data2
    var tags = event.data3

    try {
      return await db.collection('expression').add({
        data:{
          id:id,
          description:null,
          time:time,
          tags:tags
        }
      })
    } catch(e) {
      console.log(e)
    }
  }  else if (request == "add_tag") {
    var name1 = event.data1

    try {
      return await db.collection('tag').add({
        data:{
          name:name1
        }
      })
    } catch(e) {
      console.log(e)
    }
  } else if (request == "addtag_expression") {
    var id = event.data1
    var tag1 = event.data2

    try {
      return await db.collection('expression').where({
        id:id
      }).update({
        data:{
          tags:_.push([{name:tag1,num: 0}])
        },
      })
    } catch (e) {
      console.log(e)
    }
  } else if (request == "get_expression") {
    var expression_id = event.data1
    try{
      return db.collection('expression').where({
        id:expression_id
      }).get()
    } catch(e){
      console.log(e)
    }
  } else if (request == "get_set") {
    var user_id = event.data1
    //var res_file = new Array()
    var path_file = new Array()
    try{
      var res_file =  db.collection('user').where({
        _id:user_id
      }).field({
        expression_set:true
      }).get()
      console.log("转移", res_file)
      return res_file
    }catch(e){
      console.log(e)
    }
  } else if (request == "set_description") {
    var docid = event.data1
    var vdata1 = event.data2
  
    try {
      return await db.collection('expression').where({
        id:docid
      }).update({
        data:{
          description:vdata1
        }
      })
    } catch(e) {
      console.log(e)
    }
  } else if (request == "sub_expression") {
    var user_id = event.data1
    var expression = event.data2
    try{
      return await db.collection('user').where({
        _id:user_id
      }).update({
        data:{
          expression_set:_.pull({
            file_id:_.eq(expression)
          })
        }
      })
    } catch(e) {
      console.log(e)
    }
  } else if (request == "sub_tag") {
    var name1 = event.data1

    try {
      return await db.collection('tag').where({
        name:name1
      }).remove()
    } catch(e) {
      console.log(e)
    }
  } else if (request == "tab_expression") {
    var id = event.data1
    var names1 = event.data2
  
    for (var i = 0; i < names1.length; i++) {
      try {
        await db.collection('expression').where({
          id:id,
          'tags.name':names1[i]
        }).update({
          data:{
            'tags.$.num':_.inc(1)
          },
        })
      } catch (e) {
        console.log(e)
      }
    }
  } else if (request == "add_times") {
    var id = event.data1
    var path = event.data2

    try {
      await db.collection('user').where({
        _id:id,
        'expression_set.file_id':path
      }).update({
        data:{
          'expression_set.$.times':_.inc(1)
        },
      })
    } catch (e) {
      console.log(e)
    }
  } else if (request == "add_times") {
    
  }
}