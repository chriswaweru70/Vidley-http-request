const express = require('express');
const router = express.Router();

const genres = [ 
    { id: 1, name: 'Action'},
    { id: 2, name: 'Romance'},
    { id: 3, name: 'Science-fiction'},
    { id: 4, name: 'Horror'}
];


router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if(!genre) return res.status(404).send('We have no genre with that id!!!!!');
  res.send(genre);
});

router.post('/', (req, res) => {
   const { error } = validateGenre(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const genre = {
       id: genres.length + 1,
       name: req.body.name
   };
   genres.push(genre)
   res.send(genre)
});

router.put('/:id', (req, res) => {
     const genre = genres.find(g => g.id === parseInt(req.params.id));
     if(!genre) return res.status(404).send('The Genre with the given ID was not found!');

     const { error } = validateGenre(req.body);
     if (error) return res.status(400).send(error.details[0].message);

     genre.name = req.body.name;

     res.send(genre)
});

router.delete('/:id', (req, res) => {
   const genre = genres.find(g => g.id === parseInt(req.params.id));
   if (!genre) return res.status(404).send('We cannot Delete a Genre with this give ID')

   const index = genres.indexOf(genre);
   genres.splice(index, 1);

   res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name:Joi.string().min(4).required()
  };
  return Joi.validate(genre, schema);
}

module.exports = router;