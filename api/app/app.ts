import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import connectToDB from './config/db';

// app init
const app: Express = express();

// db connection
connectToDB;

// get routes
import userRoutes from './routes/user';
import tweetaRoutes from './routes/tweeta';
import cloudinaryRoutes from './routes/cloudinary';

// middlewares
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(compression());

// use routes
app.use('/api', userRoutes);
app.use('/api', tweetaRoutes);
app.use('/api', cloudinaryRoutes)

// app launching!
const port: string | number = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App is up on port: ${port}`);
});