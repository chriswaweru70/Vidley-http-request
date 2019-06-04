const {Customer, validate} = require('../models/customers')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  res.send(await Customer.find().sort('name'));
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id)

  if(!customer) return res.status(404).send('We have no Customer with that id!!!!!');

  res.send(customer);
});

router.post('/', async (req, res) => {
   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   let customer = new Customer ({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
   customer = await customer.save(customer)

   res.send(customer);
});

router.put('/:id', async (req, res) => {
         const { error } = validate(req.body);
         if (error) return res.status(400).send(error.details[0].message);


         let customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
            new: true
       });
     
          if(!customer) return res.status(404).send('The Customer with the given ID was not found!');

     res.send(customer);
});

router.delete('/:id',async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
   
   if (!customer) return res.status(404).send('The Customer with the given ID cannot be found')

   res.send(customer);
});

module.exports = router;