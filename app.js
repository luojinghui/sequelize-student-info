var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('student', 'root', '', {host : '127.0.0.1', port : '3306'});
// var connectMysql = require("./public/config-mysql.js");

app.engine('.html',ejs.__express);
app.set('view engine', 'html');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/',function(req,res) {
    res.render('index');
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:');
  });

  var task = sequelize.define('task', {
      student_name: Sequelize.STRING,
  }, {
      tableName: 'student_name_two',
      timestamps: false
  });

  task.findAll().then(function(res) {
      res.forEach(function(val) {
          console.log(val.dataValues);
      })
  })

  task.create({
      student_name : 'yaya'
  }).then(function(res) {
      for (var i = 0; i < res.length; i++) {
          console.log(res[i].dataValues);
      }
  })

  // task.destroy({where : {
  //     id : 21
  // }});

  // sequelize.query('DELETE FROM student_name_two WHERE id=15').done(function(res) {
  //     for (var i = 0; i < res.length; i++) {
  //         console.log(res[i].dataValues);
  //     }
  // })

app.get("/getStudentNams", function(req, res){
    var result = [];

    task.findAll().then(function(res) {
        res.forEach(function(val) {
            result.push(val.dataValues);
        })
    }).then(function() {
        console.log(result);
        res.send({
            status:200,
            data  :result,
            message : ""
        });
    })
});

app.delete("/deleteStudnetName/:id",function(req,res) {
    var id = req.params.id;
    // console.log(id);

    task.destroy({where : {
            id : id
        }
    }).done(function() {
        res.end();
    })
    // client.query('delete from student_name where student_id=' + id ,
    //     function(err,results) {
    //     })
    // client.end();
    // res.end();
})

app.post("/addStudentName",function(req,res) {
    var student_name = req.body.name;

    task.create({
        student_name : student_name
    }).then(function() {
        res.end();
    })

    // client.query("INSERT INTO student_name(student_name) values('" + student_name + "')",function(err) {
    //     if(err){
    //         alert("添加数据失败");
    //     };
    // })
    // client.end();
    // res.end();
})



var server = app.listen(3000,function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listen at http://%s:%s' , host, port);
})
