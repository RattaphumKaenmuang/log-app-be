import express from 'express';
import { setupSwagger } from './utils/swagger.ts';
import userRoutes from './routes/userRoutes.ts'
import { connectDB } from './config/mongo.ts';

const app = express();
const PORT = 3000;

connectDB();
setupSwagger(app);

app.use('', userRoutes);

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})