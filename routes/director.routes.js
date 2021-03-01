const express = require('express')
const router = express.Router()
//Model
const DirectorModel = require('../models/Director')

router.get('/',(req,res,next)=>{
    res.end("GET request to the Director Collection")
})

router.post("/",(req,res,next)=>{
    const newDirector = new DirectorModel(req.body)
    newDirector.save()
                .then((director)=>{res.json(director)})
                .catch((err)=>{next({message:err});
                     /*res.json(err)*/})
})


module.exports = router

router.put('/:directorId',(req,res,next)=>{
  DirectorModel.findByIdAndUpdate(req.params.directorId,req.body,{new:true})
                  .then((data)=>{res.json(data)})
                  .catch((err)=>{
                      next({message:'The Director was not found.',code:99})
                      res.json(err)
                  })
})

router.delete('/:directorId',(req,res,next)=>{
  DirectorModel.findByIdAndRemove(req.params.directorId)
              .then((data)=>{res.json(data)})
              .catch((err)=>{
                  next({message:'The Director was not found.',code:99})
                  res.json(err)
              })
})

module.exports = router;