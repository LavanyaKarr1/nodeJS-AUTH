require('dotenv').config();

const express = require('express');
const connectedToDB = require('./database/db');
const authRoutes = require('./routes/auth-router');
const homeRoutes = require('./routes/home-routes');
const adminRoutes =require('./routes/admin-routes');
const uploadImageRoutes =require('./routes/image-routes');

const app = express();
const port = process.env.port ||3001;

//database
connectedToDB();

//middleware
app.use(express.json());

//routes
app.use('/api/auth',authRoutes);
app.use('/api/home',homeRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/image',uploadImageRoutes);

app.listen(port,()=>{
    console.log(`server is now listening to  ${port} port`);
    
})