const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.MONGO_DB_CONNECTION , {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
           /*  useCreateIndex: true */
        });

        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }


}


module.exports = {
    dbConnection
}