const express=require('express')
const app=express()
const bodyparser=require('body-parser')
app.use(express.json(bodyparser))
const url=require('./mongo1.js')
const router=express.Router()
const { ObjectId } = require('mongodb')
MongoClient=require('mongodb').MongoClient
const client=new MongoClient(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
client.connect(err=>{
    const coll=client.db('SIH1').collection('SIH')
    console.log('ready')
    app.post('/signup',(req,res)=>{
        const newUser={
            name:req.body.name,
            email:req.body.email,
            dob:req.body.dob,
            password:req.body.password

        }
        const query={email:newUser.email}
        collection.findOne(query,(err,result)=>{
            if (result==Null){
                collection.insertOne(newUser,(err,result)=>{
                    res.status(200).send()
                })
            }
            else{
                res.status(400).send()
            }
        })
    })
    app.post('/login',(req,res)=>{
        const query={
            email:req.body.email,
            password:req.body.password
        }
        collection.findOne(query,(err,result)=>{
            if (result!=Null){
                const objToSend={
                    name:result.name,
                    email:result.email
                }
                res.status(200).send(JSON.stringify(objToSend))
            }
            else{
                res.status(404).send()
            }
        })
    })

})
MongoClient.connect(url,(err,db)=>{
    if(err) throw err;
    console.log('connected')
    db.close()
})
app.listen(8080,()=>{
    console.log('server is ready')
})