import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://mongodb:27017/log-app';
        mongoose.connect(uri)
            .then(() => console.log('Connected to MongoDB'))
            .catch((err) => console.error('MongoDB connection error:', err))
    } catch (err) {
        console.error('MongoDB connection error: ', err)
        process.exit(1);
    }
}