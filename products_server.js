import { ladders } from "./products/data/ladders.db"
import express from "express"
import cors from "cors"
import mysql from "mysql"

var db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user:'root',
    password:"",
    database:"ladders_db",
    // TODO  make an sql database for this 
})


db.connect(function(err){
    if(err) throw err;
    console.log("connected to database")
})


console.log("server active")

const server = express()
server.use(cors())


server.get("/",(req,res)=>{
    res.send("hello")
})

server.get("/products",(req,res) =>{
    db.query("CALL `getAll`",function(err,result){
        if(err) throw err;
        console.log("test")
        console.log(result[0][0].restock_Date)
        console.log(typeof(result[0][0].restock_Date))
        res.json(result[0])
    })
    // res.json(ladders)
})

server.get("/products/:id",(req,res)=>{
    let id = req.params.id
    db.query("CALL `getProduct`("+id+")",function(err,result){
        if(err) throw err;
        res.json(result[0])
    })
})

server.listen(6969,function(){
    console.log("sever now running on 6969")
})