const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.js');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.listen(8800, () => {
    console.log('API is working');
});