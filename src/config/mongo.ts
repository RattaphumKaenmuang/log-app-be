import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        mongoose.connect('mongodb://localhost:27017/log-app')
            .then(() => console.log('Connected to MongoDB'))
            .catch((err) => console.error('MongoDB connection error:', err))
    } catch (err) {
        console.error('MongoDB connection error: ', err)
        process.exit(1);
    }
}