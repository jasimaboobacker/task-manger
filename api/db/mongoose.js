const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TaskManager',{useNewUrlParser: true}).then(()=>{
    console.log("Connected to db");
}).catch((e)=>{
    console.log("Error Connecting to DB");
    console.log(e);
});

mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

module.exports={
    mongoose
    
}