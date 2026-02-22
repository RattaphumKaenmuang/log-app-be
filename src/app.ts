import express from 'express';
import cors from 'cors';
import { setupSwagger } from './utils/swagger.js';
import userRoutes from './routes/userRoutes.js';
import logRoutes from './routes/logRoutes.js';
import { connectDB } from './config/mongo.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

connectDB();
setupSwagger(app);

app.use('/api/user', userRoutes);
app.use('/api/log', logRoutes);

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})