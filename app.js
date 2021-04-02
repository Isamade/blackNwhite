const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

mongoose
    .connect(process.env.DATABASE_PROD, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,  useFindAndModify: false})
    .then(() => console.log('DB connected'))
    .catch(err => {
        console.log(err);
    });
    
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log('everytime');
app.use('/api', blogRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});