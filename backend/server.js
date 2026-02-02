import app from './src/app.js';
import connectDB from './src/config/db-config.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`)
    })
}

startServer();