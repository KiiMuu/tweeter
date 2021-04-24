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

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(compression());

// use routes
app.use('/api', userRoutes);

// app launching!
const port: string | number = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App is up on port: ${port}`);
});