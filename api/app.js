const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose')

const { List,Task } = require('./db/models');
//const { Task } = require('./db/models/task.model');

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.get('/lists',(req,res)=>{
    //res.send("Hello World");
    //return array of all the liusts  from db
    List.find({}).then((lists)=>{
        res.send(lists);
    });
});

app.post('/lists',(req, res) =>{
    //save and return list
    let title = req.body.title;

    let newList = new List({
        title
    });

    newList.save().then((listDoc)=>{
        res.send(listDoc);
    })
});

app.patch('/lists/:id',(req,res)=>{
    //update the list
    List.findOneAndUpdate({_id: req.params.id},{
        $set:req.body
    }).then(()=>{
        res.send({message: "Update Succs"});
    });
});

app.delete('/lists/:id',(req,res) =>{
    List.findOneAndRemove({_id: req.params.id}).then((removedListDoc) => {
        res.send(removedListDoc);
    })
});

app.get('/lists/:listId/tasks',(req,res)=>{
    Task.find({
        _listId: req.params.listId
    }).then((tasks)=>{
        res.send(tasks);
    })
});

app.post('/lists/:listId/tasks',(req,res)=>{
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    })

    newTask.save().then((newTaskDoc)=>{
        res.send(newTaskDoc);
    })
});

app.patch('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    },{
        $set: req.body
    }).then(()=>{
        res.send({message: "UpdateSuccess"});
    })
});


app.delete('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTask)=>{
        res.send(removedTask);
    })
});

app.get('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task)=>{
        res.send(task);
    });
})

app.listen(3000,() =>{
    console.log("listening at port 3000");
});