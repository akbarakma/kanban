if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./routers/index');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use('/', router);
app.use(errorHandler);


app.listen(PORT, console.log(`Listening on port ${PORT}`));