const express = require('express')
const dotenv = require('dotenv')
const connectDb = require('./config/db')
const cookieParser = require('cookie-parser');


// lode env vars
dotenv.config({ path: './config/config.env' })

// connect database
connectDb();

// lode middlewares
const logger = require('./middleware/logger')
const errorHandler = require('./middleware/error')

//lode routes 
const bootcamps = require('./router/bootcamps')
const courses = require('./router/courses');
const auth = require('./router/auth');
const users = require('./router/users');

const app = express();

// body parser
app.use(express.json())

// Cookie parser
app.use(cookieParser());

// Mount middleware
if (process.env.NODE_ENV === 'development') {
    app.use(logger)
}

// Mount routes
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);

app.use(errorHandler);

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`));

// handle unHandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`)
    // close server and exit process
    server.close(() => process.exit(1))
})