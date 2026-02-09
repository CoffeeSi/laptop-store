import dotenv from 'dotenv';
import { transporter } from "../backend/src/utils/nodemailer.js"
dotenv.config();

import app from './src/app.js';
import connectDB from './src/config/db-config.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        return;
    }
};

startServer();