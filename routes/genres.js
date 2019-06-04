const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


const Genre = mongoose.model( 'Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  }
}));

router.get('/', async (req, res) => {
  res.send(await Genre.find().sort('name'));
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id)

  if(!genre) return res.status(404).send('We have no genre with that id!!!!!');

  res.send(genre);
});

router.post('/', async (req, res) => {
   const { error } = validateGenre(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   let genre = new Genre ({ name: req.body.name });
   genre = await genre.save(genre)

   res.send(genre);
});

router.put('/:id', async (req, res) => {
         const { error } = validateGenre(req.body);
         if (error) return res.status(400).send(error.details[0].message);


         let genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
            new: true
       });
     
          if(!genre) return res.status(404).send('The Genre with the given ID was not found!');

     res.send(genre);
});

router.delete('/:id',async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
   
   if (!genre) return res.status(404).send('The genre with the given ID cannot be found')

   res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name:Joi.string().min(4).required()
  };
  return Joi.validate(genre, schema);
}

module.exports = router;