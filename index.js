var express = require("express")
var bodyParser = require("body-parser")
var dotenv = require("dotenv")

const app = express()

dotenv.config({ path: "./config.env"});
// require('./dbf/conn');

var mongoose = require("mongoose")
const DB = process.env.DATABASE;


mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology:true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in connecting to Databse"));
db.once('open',()=>console.log("Connected to Database"))



app.use(bodyParser.json())
app.use(express.static('public'))

app.use(bodyParser.urlencoded({
    extended:true
}))


const PORT = process.env.PORT;

app.post("/",async (req,res)=>{
    try {
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
    
    } catch (error) {
        res.status(400).send(error);
    }
    
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
})

app.listen(PORT,() =>{
    console.log('Listening on 5000');
})

