import env from 'dotenv';
import app from './app.js';
import dbConnect from './db/dbConnect.js';

env.config();

// database connection
dbConnect()
    .then(() => {
        app.listen(process.env.PORT || 1000, () => {
            console.log(`Server is running at port ${process.env.PORT}...`);
        });
    })
    .catch((err) => {
        console.log('MONGO db connection failed', err);
    });
