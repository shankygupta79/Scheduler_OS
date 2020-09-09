const route = require('express').Router()
const Task = require('../database').Task
const path = require('path')
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}
var xid = 0;
const authCheck = (req, res, next) => {
  if (isEmpty(req.user)) {
    //user is not logged in
    res.redirect('/login')
  } else {

    xid = req.user[0].id

    console.log(xid)
    next()
  }
}

route.get('/add_single', authCheck, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/add_entry.html'))
})
route.get('/add_multiple', authCheck, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/add_entry2.html'))
})
route.get('/manage_tasks', authCheck, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/manage_tasks.html'))
})
route.get('/edit_task', authCheck, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/edit_task.html'))
})
route.get('/scheduler', authCheck, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/scheduler.html'))
})
route.get('/css_sch', (req, res) => {
  res.sendFile(path.join(__dirname, '../css/sch.css'))
})
route.get('/css', (req, res) => {
  res.sendFile(path.join(__dirname, '../css/task.css'))
})
function cr(arr) {
  if (arr.fix == 'true') {
    arr.fix = 1;
  }
  if (arr.des == "") {
    arr.des = "No Comments !"
  }
  return Task.create({
    U_ID: xid,
    name: arr.name,
    start: arr.start,
    duration: arr.duration,
    day: arr.day,
    text: arr.des,
    fix: arr.fix,
    end: arr.end,

  }).then((hol) => {
    console.log("Task Added Successfully !")
    return true

  }).catch((err) => {
    console.log(err)
    false
  })
}
function start(num) {
  num=num%1440;
  var h = Math.floor(num / 60);
  var min = num % 60;
  if (h == 0) {
    h = '00'
  } else {
    if (h > 0 && h <= 9) {
      h = '0' + h
    }
  }
  if (min == 0) {
    min = '00'
  } else {
    if (min > 0 && min <= 9) {
      min = '0' + min
    }
  }


  return h + ":" + min
}
function cr2(arr) {
  if (arr.fix == 1) {
    arr.fix = 1;
  } else {
    arr.fix = 2;
    arr.day = arr.day;
  }
  arr.start = start(arr.start)

  return Task.update({
    start: arr.start,
    day: arr.day,
    fix: arr.fix,

  }, { where: { id: arr.id } }).then((hol) => {
    console.log("Task Added Successfully !")
    return true

  }).catch((err) => {
    console.log(err)
    false
  })
}
route.post('/add_task', authCheck, (req, res) => {
  console.log("Hey IN Add")
  Task.create({
    U_ID: xid,
    name: req.body.name,
    start: req.body.start,
    duration: req.body.duration,
    day: req.body.day,
    text: req.body.des,
    fix: req.body.fix,
    end: req.body.end,

  }).then((hol) => {
    console.log("Task Added Successfully !")
    return res.send({ message: 'true' })

  }).catch((err) => {
    console.log(err)
    return res.send({
      message: "Some Error Occured in our Database ! "
    })
  })
})
route.post('/add_task2', authCheck, async (req, res) => {
  console.log("Hey IN Add Mul")
  for (var i = 0; i < req.body.arr.length; i++) {
    var a = await cr(req.body.arr[i])
    if (a == true) {

    } else {
      return res.send({
        message: "Error in Task " + (i + 1) + " ! "
      })
    }
  }
  return res.send({
    message: "true"
  })
})
route.post('/add_task3', authCheck, async (req, res) => {
  console.log("Hey IN Add Mul Save")
  for (var i = 0; i < req.body.arr.length; i++) {
    var a = await cr2(req.body.arr[i])
    if (a == true) {

    } else {
      return res.send({
        message: "Error in Task " + (i + 1) + " ! "
      })
    }
  }
  return res.send({
    message: "true"
  })
})
route.get('/api/tasks', authCheck, (req, res) => {
  console.log(req.query.id)
  if (req.query.id > 0) {
    Task.findOne({ where: { id: req.query.id } })
      .then((emps) => {
        res.status(200).send(emps)
      })
      .catch((err) => {
        console.log(err)
        return res.send({
          message: "Could not retrive tasks"
        })
      })
  } else {
    Task.findAll({ where: { U_ID: xid } })
      .then((emps) => {
        res.status(200).send(emps)
      })
      .catch((err) => {
        console.log(err)
        return res.send({
          message: "Could not retrive tasks"
        })
      })
  }
})
route.get('/api/dash', authCheck, (req, res) => {
  Task.findAll({
    where: { day: req.query.day }, order: [
      ['start', 'ASC'],
    ],
  })
    .then((emps) => {
      res.status(200).send(emps)
    })
    .catch((err) => {
      console.log(err)
      return res.send({
        message: "Could not retrive tasks"
      })
    })



})
route.post('/edit_tsk', authCheck, (req, res) => {
  console.log(req.query.id + " IN EDIT")
  Task.update({
    name: req.body.name,
    start: req.body.start,
    duration: req.body.duration,
    day: req.body.day,
    text: req.body.des,
    fix: req.body.fix,
    end: req.body.end,
  }, { where: { id: req.query.id } }).then((user) => {
    console.log("Task Edited Successfully !")
    return res.send({ message: 'true' })

  }).catch((err) => {
    console.log(err)
    return res.send({
      message: "Could not retrive the database"
    })
  })
})
route.post('/delete', authCheck, (req, res) => {
  console.log(req.query.id + " IN Delete")
  Task.destroy({
    where: {
      id: req.query.id
    }
  }).then((user) => {
    console.log("Task Deleted Successfully !")
    return res.send({ message: 'true' })

  }).catch((err) => {
    console.log(err)
    return res.send({
      message: "Could not retrive tasks for deletion !"
    })
  })
})

module.exports = route