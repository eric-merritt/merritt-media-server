import mongoose from 'mongoose';
import dotenv from 'dotenv';
    dotenv.config();


export default async function connect() {

    try {

       const db = process.env.MONGODB_URI || '';

       await mongoose.connect(db, {

        dbName: 'merritt-media-server',
        
       });

       const connection = mongoose.connection;

       connection.on('connected', () => {
        console.log('MongoDB connected successfully.')
       })

       connection.on('error', (err) => {
        console.log('MongoDB connection error: ', err);
       });

    } catch (error) {

        console.log(error);
    }
}