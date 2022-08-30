import express from "express"
import cors from "cors"
import mysql from "mysql"
// import {bodyparser} from "body-parser"
const bodyParser = require('body-parser');


var db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user:'root',
    password:"",
    database:"ladders_db",
})


db.connect(function(err){
    if(err) throw err;
    console.log("connected to database")
})


console.log("server active")

const server = express()
server.use(cors())
server.use(bodyParser.json());


server.get("/",(req,res)=>{
    res.send("hello")
})

server.get("/products",(req,res) =>{
    db.query("CALL `get_active`",function(err,result){
        if(err) throw err;
        res.json(result[0])
    })
    // res.json(ladders)
})
server.get("/admin/products",(req,res) =>{
    db.query("CALL `getAll`",function(err,result){
        if(err) throw err;
        res.json(result[0])
    })
})

server.get("/products/:id",(req,res)=>{
    let id = req.params.id
    console.log(id)
    db.query("CALL `getProduct`("+id+")",function(err,result){
        if(err) throw err;
        res.json(result[0])
    })
})


server.post("/admin/add",(req,res)=>{
    let prod = req.body
    console.log(req.body)
    let name = prod.name
    let pd = prod.price_d
    let pc = prod.price_c
    let avail = prod.availibility
    let stock = prod.restock_Date
    let img = prod.img
    let desc = prod.description

    let query= "CALL `add_product`(?,?,?,?,?,?,?)"
    db.query(query,[name,pd,pc,avail,stock,img,desc],(err,result)=>{
        if(err) res.send(err)
        else{
            res.send("created")
        }
    })
})

server.post("/admin/login",(req,res)=>{
    console.log(req.body)
    // let login = req.body
    let name = req.body.name;
    let pass = req.body.pass;
    let query = "CALL `login`(?,?)"
    db.query(query,[name,pass],function(err,result){
        // console.log(result)
        if(err) res.send(err);
        res.json(result[0][0])
    })
})

server.post("/admin/update",(req,res)=>{
    let id = req.body.Id
    let name = req.body.name
    let pd = req.body.price_d
    let pc = req.body.price_c
    let avail = req.body.avalibility
    let dat = req.body.restock_Date
    let img = req.body.img_url
    let des = req.body.description
    let active = req.body.active
    console.log(req.body)
    let query = "CALL`update`(?,?,?,?,?,?,?,?)"
    db.query(query,[id,name,pd,pc,avail,dat,img,des,active],(err,data)=>{
        if(err)
        {
            res.send(err)
        }
        else
        {
            res.send("updated successfuly")
        }
    })


})

server.delete("/admin/delete/:id",(req,res)=>{
    let id = req.params.id
    let query = "CALL `del`(?)"
    db.query(query,[id],(err,data)=>{
        if(err) throw err;
        else
        {
            res.send("deleted successfully")
        }
    })
})

server.listen(6969,function(){
    console.log("sever now running on 6969")
})
