const { Schema, model } = require('mongoose');

const GuestSchema = Schema({
    wedding_id: {
        type: String,
        required: true
    },
   nombre: {
       type: String,
       required: true
   },
   email: {
       type: String,
       required: true,
   },
   number: {
       type: String,
       required: true,
   },
   wedding_zone: {
    type: String,
   },
   img: {
       type: String,
   },
   confirmation: {
    type: String,
    }
});

GuestSchema.method('toJSON', function() {
   const { __v, _id, password, ...object } = this.toObject();
   object.uid = _id;
   return object;
})


module.exports = model( 'Guest', GuestSchema );
