import { useReducer } from 'react';
import axios from 'axios';
import ChatContext from '../contexts/chat';
import { chatReducer, initialChatState } from '../reducers/chat';
import {
	CreateChatType,
	GetChatMessagesType,
	GetChatType,
	GetUserChatsType,
	UpdateChatType,
	MarkChatAsReadType,
	CreateMessageType,
} from '../types/chat';
import useUserInfo from '../../hooks/useUserInfo';
import { IChat, IMessage, UserInfoProps } from '../../typings';

const ChatState = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(chatReducer, initialChatState);
	const { currentUser } = useUserInfo();

	// * actions
	const createChat = async (
		users: UserInfoProps
	): Promise<{ singleChat: IChat } | void> => {
		try {
			dispatch({
				type: CreateChatType.CREATE_CHAT_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.post(`/chat`, { users }, config);

			dispatch({
				type: CreateChatType.CREATE_CHAT_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: CreateChatType.CREATE_CHAT_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const getUserChats = async (
		unreadOnly: boolean
	): Promise<{ userChats: IChat[] } | void> => {
		try {
			dispatch({
				type: GetUserChatsType.GET_USER_CHATS_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.get(
				`/chats?unreadOnly=${unreadOnly}`,
				config
			);

			dispatch({
				type: GetUserChatsType.GET_USER_CHATS_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: GetUserChatsType.GET_USER_CHATS_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const getChat = async (
		chatId: string
	): Promise<{ singleChat: IChat } | void> => {
		try {
			dispatch({
				type: GetChatType.GET_CHAT_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.get(`/chats/${chatId}`, config);

			dispatch({
				type: GetChatType.GET_CHAT_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: GetChatType.GET_CHAT_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const updateChat = async (
		chatId: string,
		chatName: string
	): Promise<{ singleChat: IChat } | void> => {
		try {
			dispatch({
				type: UpdateChatType.UPDATE_CHAT_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.put(
				`/chats/${chatId}`,
				{ chatName },
				config
			);

			dispatch({
				type: UpdateChatType.UPDATE_CHAT_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: UpdateChatType.UPDATE_CHAT_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const getChatMessages = async (
		chatId: string
	): Promise<{ chatMessages: IMessage[] } | void> => {
		try {
			dispatch({
				type: GetChatMessagesType.GET_CHAT_MESSAGES_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.get(
				`/chats/${chatId}/messages`,
				config
			);

			dispatch({
				type: GetChatMessagesType.GET_CHAT_MESSAGES_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: GetChatMessagesType.GET_CHAT_MESSAGES_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const markChatMessagesAsRead = async (
		chatId: string
	): Promise<{ chatMessages: IMessage[] } | void> => {
		try {
			dispatch({
				type: MarkChatAsReadType.MARK_CHAT_AS_READ_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.put(
				`/chats/${chatId}/messages/markAsRead`,
				{},
				config
			);

			dispatch({
				type: MarkChatAsReadType.MARK_CHAT_AS_READ_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: MarkChatAsReadType.MARK_CHAT_AS_READ_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	// messages
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
		<ChatContext.Provider
			value={{
				createChatLoading: state.createChatLoading,
				createChatError: state.createChatError,
				createChatSuccess: state.createChatSuccess,
				userChatListLoading: state.userChatListLoading,
				userChatListError: state.userChatListError,
				userChats: state.userChats,
				singleChatLoading: state.singleChatLoading,
				singleChatError: state.singleChatError,
				singleChat: state.singleChat,
				updateChatLoading: state.updateChatLoading,
				updateChatError: state.updateChatError,
				chatMessagesLoading: state.chatMessagesLoading,
				chatMessagesError: state.chatMessagesError,
				chatMessages: state.chatMessages,
				markChatMessagesAsReadLoading:
					state.markChatMessagesAsReadLoading,
				markChatMessagesAsReadError: state.markChatMessagesAsReadError,
				// messages
				createMessageLoading: state.createMessageLoading,
				createMessageError: state.createMessageError,
				message: state.message,
				createChat,
				getUserChats,
				getChat,
				updateChat,
				getChatMessages,
				markChatMessagesAsRead,
				createMessage,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export default ChatState;
