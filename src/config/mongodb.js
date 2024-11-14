import mongoose from 'mongoose';
import { env } from './environment';

export const CONNECT_DB = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

export const CLOSE_DB = async () => {
    try {
        await mongoose.connection.close();
        console.log('Mongoose connection closed');
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
    }
};
