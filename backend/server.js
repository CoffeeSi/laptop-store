const app = require('./src/app');
const connectDB = require('./src/config/db.config.js');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`)
    })
}

startServer();