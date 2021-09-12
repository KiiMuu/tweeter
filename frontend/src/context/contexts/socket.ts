import { createContext } from 'react';
import { Socket } from 'socket.io-client';

type searchContextType = {
	socket: Socket | null;
};

const socketContextDefaultValues: searchContextType = {
	socket: null,
};

const SocketContext = createContext<searchContextType>(
	socketContextDefaultValues
);

export default SocketContext;
