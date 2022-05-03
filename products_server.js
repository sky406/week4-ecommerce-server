import { ladders } from "./products/data/ladders.db"
import express from "express"
console.log("server active")

const server = express()

server.get("/",(req,res)=>{
    res.send("hello")
})

server.get("/products",(req,res) =>{
    res.json(ladders)
})

server.get("/products/:id",(req,res)=>{
    let id = req.params.id
    res.json(jsondata.find(x => x.id == id))
})

server.listen(6942,function(){
    console.log("sever now running on 6942")
})