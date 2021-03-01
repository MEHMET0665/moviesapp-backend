const express = require('express')
const Movie = require('../models/Movie')
const router=express.Router()
// Model
const MovieModel=require('../models/Movie')
// get all movies :localhost3000/api/movies/
router.get('/', (req, res) => {
MovieModel.find() 
              .then((movieList)=>{res.json(movieList)})
              .catch((errMsg)=>{res.json(errMsg)})
})
// get all movies :localhost3000/api/movies/
router.get('/top10', (req, res) => {
  MovieModel.find().sort({imdb_score:-1}).limit(10) 
                .then((movieList)=>{res.json(movieList)})
                .catch((errMsg)=>{res.json(errMsg)})
              })
// get between movies :localhost3000/api/movies/between/:startYear/:endYear
router.get('/between/:startYear/:endYear', (req, res) => {
  const {startYear,endYear}=req.params;
  //gte:greater than or equal lte less than or equal
  MovieModel.find({year:{'$gte':parseInt(startYear),'$lte':parseInt(endYear)}})
                .then((movieList)=>{res.json(movieList)})
                .catch((errMsg)=>{res.json(errMsg)})
              })

// get a movies :localhost3000/api/movies/movieId
router.get('/:movieId', (req, res) => {
  MovieModel.findById(req.params.movieId) 
                .then((movie)=>{res.json(movie)})
                .catch((errMsg)=>{res.json(errMsg)})
  })

  
router.post("/",(req,res,next)=>{
  const newMovie = new MovieModel(req.body)
  newMovie.save()
              .then((movie)=>{res.json(movie)})
              .catch((err)=>{next({message:error})
                // res.json(err)
              })
})
// api/movies/:movieId update a movie with new info
router.put('/:movieId',(req,res,next)=>{
  MovieModel.findByIdAndUpdate(req.params.movieId,req.body,{new:true})
               .then((movie)=>{res.json(movie)})
              .catch((err)=>{res.json(err)})
})
router.delete('/:movieId',(req,res,next)=>{
  MovieModel.findByIdAndRemove(req.params.movieId)
               .then((movie)=>{res.json(movie)})
              .catch((err)=>{res.json(err)})
})
module.exports=router