import { createContext } from 'react';
import { IMessage } from '../../typings';

type messageContextType = {
	createMessageLoading: boolean;
	createMessageError: string | null;
	message: IMessage;
	createMessage: (
		content: string,
		chatId: string
	) => { message: IMessage } | object;
};

const messageContextDefaultValues: messageContextType = {
	createMessageLoading: false,
	createMessageError: null,
	message: {},
	createMessage: () => {
		return { message: {} };
	},
};

const MessageContext = createContext<messageContextType>(
	messageContextDefaultValues
);

export default MessageContext;
