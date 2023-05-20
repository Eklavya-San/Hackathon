const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = 'path';
const mongoose=require('mongoose');
const port = 3000;
const mongopath='mongodb://127.0.0.1:27017/hackathon'
const productroutes = require('./routes/productroutes');
mongoose.set('strictQuery', true);
app.use(bodyParser.json());
app.use('/',productroutes);
mongoose.connect(
        mongopath,{
            useNewUrlParser:true,
            
        },
        (err)=>{
            if(err){
            console.log(err);
        }else{
            console.log(`\t\t\t\tServer connected to db`);
        }
    })

        app.listen(port,()=>{
            console.log(`\t\t\t\tServer is listening to ${port}`);
        })

