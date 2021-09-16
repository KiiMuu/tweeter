import { useContext, useEffect } from 'react';
import SocketContext from '../context/contexts/socket';

const useSocket = (eventName: string, eventHandler: any) => {
	const { socket } = useContext(SocketContext);

	useEffect(() => {
		socket?.on(eventName, eventHandler);

		return () => {
			socket?.off(eventName, eventHandler);
		};
	}, [eventName, eventHandler, socket]);
};

export default useSocket;
