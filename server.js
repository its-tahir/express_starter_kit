const express = require('express')
const dotenv = require('dotenv')

// lode env vars
dotenv.config({ path: './config/config.env' })

//lode routes 
const bootcamps=require('./router/bootcamps')

const app = express();

// Mount routes
app.use('/api/v1/bootcamps',bootcamps)




const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`));