import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import SocketContext from '../contexts/socket';

const SocketState: React.FC = ({ children }) => {
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const newSocket = io(process.env.REACT_APP_API as string);

		setSocket(newSocket);

		newSocket.on('connection', () => {
			console.log('SocketIO: Connected!');
		});

		newSocket.on('error', (msg: string) => {
			console.error('SocketIO: Error', msg);
		});

		return () => {
			newSocket.close();
		};
	}, [setSocket]);

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketState;
