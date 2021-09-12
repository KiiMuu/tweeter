import { useContext, useEffect } from 'react';
import SocketContext from '../context/contexts/socket';

const useSocket = (eventName: string, eventHandler: any) => {
	const { socket } = useContext(SocketContext);

	useEffect(() => {
		console.log('SocketIO: adding listener', eventName);
		socket?.on(eventName, eventHandler);

		return () => {
			console.log('SocketIO: removing listener', eventName);
			socket?.off(eventName, eventHandler);
		};
	}, [eventName, eventHandler, socket]);
};

export default useSocket;
