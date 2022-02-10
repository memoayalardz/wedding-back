const { Schema, model } = require('mongoose');

const CoverageSchema = Schema({
    user_id:{
        type: String,
        required: true
    },
   nombre: {
       type: String,
       required: true
   },
   price: {
       type: String,
       required: true,
   },
   number_guest: {
       type: String,
       required: true,
   },
   img: {
       type: String,
   },
   details: {
    type: String,
   },
});

CoverageSchema.method('toJSON', function() {
   const { __v, _id, password, ...object } = this.toObject();
   object.uid = _id;
   return object;
})


module.exports = model( 'Coverage', CoverageSchema );
