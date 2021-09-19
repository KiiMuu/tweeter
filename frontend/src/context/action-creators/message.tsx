import { useReducer } from 'react';
import axios from 'axios';
import MessageContext from '../contexts/message';
import { messageReducer, initialMessageState } from '../reducers/message';
import { CreateMessageType } from '../types/message';
import useUserInfo from '../../hooks/useUserInfo';
import { IMessage } from '../../typings';

const MessageState = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(messageReducer, initialMessageState);
	const { currentUser } = useUserInfo();

	// * actions
	const createMessage = async (
		content: string,
		chatId: string
	): Promise<{ message: IMessage } | void> => {
		try {
			dispatch({
				type: CreateMessageType.CREATE_MESSAGE_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.post(
				`/message`,
				{ content, chatId },
				config
			);

			dispatch({
				type: CreateMessageType.CREATE_MESSAGE_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: CreateMessageType.CREATE_MESSAGE_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	return (
		<MessageContext.Provider
			value={{
				createMessageLoading: state.createMessageLoading,
				createMessageError: state.createMessageError,
				message: state.message,
				createMessage,
			}}
		>
			{children}
		</MessageContext.Provider>
	);
};

export default MessageState;
