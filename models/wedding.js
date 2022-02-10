const { Schema, model } = require('mongoose');

const WeddingSchema = Schema({

   date: {
       type: String,
       required: true
   },
   start_time: {
       type: String
   },
   coverage: {
       type: String,
       required: true,
   },
   img: {
       type: String,
   },
   wedding_planer_id: {
       type: String,
       required: true,
       default: 'N/A'
   },
   newlywed_name_one: {
       type: String,
       default: false
   },
   newlywed_name_two: {
    type: String,
    default: false
    }
});

WeddingSchema.method('toJSON', function() {
   const { __v, _id, password, ...object } = this.toObject();
   object.uid = _id;
   return object;
})


module.exports = model( 'Wedding', WeddingSchema );
