const mongoose = require('mongoose');

const connectedToDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongodb connected successfully');
        

    }catch(e){
        console.error('MongoDb connection Faileed',e);
        process.exit(1);
        
    }
}

module.exports = connectedToDB;
