import express from 'express';
import cors from 'cors';
import { setupSwagger } from './utils/swagger.ts';
import userRoutes from './routes/userRoutes.ts';
import logRoutes from './routes/logRoutes.ts';
import { connectDB } from './config/mongo.ts';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

connectDB();
setupSwagger(app);

app.use('/user', userRoutes);
app.use('/log', logRoutes);

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})