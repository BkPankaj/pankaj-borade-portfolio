var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))

app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://127.0.0.1:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology:true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in connecting to Databse"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var ques = req.body.ques;
    var des = req.body.des;


    var data = {
        "name":name,
        "email":email,
        "ques":ques,
        "des":des
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
        
    });
    
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
}).listen(3000);

console.log("Listening on PORT 3000");
