import dotenv from 'dotenv';
import app from './routes/index';
import { connectDB } from './config/db';

dotenv.config();

(async () => {
    try {
        await connectDB();
        const port = Number(process.env.PORT || 3000);
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error('DB connection failed:', err);
        process.exit(1);
    }
})();