const { Router } = require('express');
const express = require('express');
const routes = express.Router();
const ModelApp = require('../model/products');

routes.get('/',(req,res)=>{
    res.send("Welcome to Digiflakex");
})

routes.get('/getalldata',async(req,res)=>{
    try{
        const data = await ModelApp.find();
        res.json(data);

    }catch(error) {
        res.json({    message:error  })
    }
})
routes.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const updatedData = await ModelApp.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedData);
    } catch (error) {
      res.json({ message: error });
    }
  });
  
  routes.patch('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedData = await ModelApp.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedData);
    } catch (error) {
      res.json({ message: error });
    }
  });

  routes.delete('/:id',async (req,res)=>{
    const { id } = req.params; 

    try{
      const deletedData = await ModelApp.deleteOne(id);
      res.json(deletedData);
    }catch(error){
      res.json({ message: error });
    }
  })

  routes.post('/',async(req,res)=>{
    const modelApp = new ModelApp({
        id:req.body.id,
        name:req.body.name,
        packSize:req.body.packSize,
        category:req.body.category,
        mrp:req.body.mrp,
        img:req.body.img,
        status:req.body.status

    });

    try{
        const savedData = await modelApp.save();
        res.json(savedData);

    }catch(error){
        res.json(
            {message:error}
        )
    }
})

module.exports= routes;