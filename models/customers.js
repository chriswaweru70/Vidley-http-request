const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model( 'Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
       },
     name: {
       type: String,
       required: true,
       minlength: 5,
       maxlength: 50,
     },
     phone: {
         type: Number,
         required: true,
         minLength: 10,
         maxLength: 11
     }
   }));

   function validateCustomer(customer) {
    const schema = {
      name:Joi.string().min(5).max(50).required(),
      phone:Joi.string().min(10).max(11).required(),
      isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema);
  }

  exports.Customer = Customer;
  exports.validate = validateCustomer