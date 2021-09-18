import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import connectToDB from './config/db';

// app init
const app: Express = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST', 'PUT'],
	},
	pingTimeout: 60000,
});

// db connection
connectToDB;

// get routes
import userRoutes from './routes/user';
import tweetaRoutes from './routes/tweeta';
import cloudinaryRoutes from './routes/cloudinary';
import searchRoutes from './routes/search';
import notificationRoutes from './routes/notification';
import chatRoutes from './routes/chat';
import messageRoutes from './routes/message';

// middlewares
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(compression());

// use routes
app.use('/api', userRoutes);
app.use('/api', tweetaRoutes);
app.use('/api', cloudinaryRoutes);
app.use('/api', searchRoutes);
app.use('/api', notificationRoutes);
app.use('/api', chatRoutes);
app.use('/api', messageRoutes);

// socket io
io.on('connection', (socket: Socket) => {
	console.info(`client connected [id=${socket.id}]`);

	socket.on('setup', user => {
		console.log(`user connected: @${user.username}`);
		socket.join(user._id);
		socket.emit('connected');
	});

	socket.on('notification received', room => {
		console.log('notification in room', room);
		socket.in(room).emit('notification received');
	});
});

// app launching!
const port: string | number = process.env.PORT || 5000;

server.listen(port, () => {
	console.log(`App is up on port: ${port}`);
});
