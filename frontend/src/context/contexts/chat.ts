import { createContext } from 'react';
import { IChat, IMessage, UserInfoProps } from '../../typings';

type chatContextType = {
	createChatLoading: boolean;
	createChatSuccess: boolean;
	createChatError: string | null;
	createdChat: IChat;
	userChatListLoading: boolean;
	userChatListError: string | null;
	userChats: IChat[];
	singleChatLoading: boolean;
	singleChatError: string | null;
	singleChat: IChat;
	updateChatLoading: boolean;
	updateChatSuccess: boolean;
	updateChatError: string | null;
	chatMessagesLoading: boolean;
	chatMessagesError: string | null;
	chatMessages: IMessage[];
	markChatMessagesAsReadLoading: boolean;
	markChatMessagesAsReadError: string | null;
	// messages
	createMessageLoading: boolean;
	createMessageSuccess: boolean;
	createMessageError: string | null;
	message: IMessage;

	createChat: (users: UserInfoProps[]) => { createdChat: IChat } | object;
	getUserChats: (unreadOnly: boolean) => { userChats: IChat[] } | object;
	getChat: (chatId: string) => { singleChat: IChat } | object;
	updateChat: (
		chatId: string,
		chatName: string
	) => { singleChat: IChat } | object;
	getChatMessages: (chatId: string) => { chatMessages: IMessage[] } | object;
	markChatMessagesAsRead: (chatId: string) => { ok: string } | object;
	createMessage: (content: string, chatId: string) => IMessage;
	onMessageRecieved: (message: IMessage) => void;
};

const chatContextDefaultValues: chatContextType = {
	createChatLoading: false,
	createChatError: null,
	createChatSuccess: false,
	createdChat: {},
	userChatListLoading: false,
	userChatListError: null,
	userChats: [],
	singleChatLoading: false,
	singleChatError: null,
	singleChat: {},
	updateChatLoading: false,
	updateChatSuccess: false,
	updateChatError: null,
	chatMessagesLoading: false,
	chatMessagesError: null,
	chatMessages: [],
	markChatMessagesAsReadLoading: false,
	markChatMessagesAsReadError: null,
	createMessageLoading: false,
	createMessageSuccess: false,
	createMessageError: null,
	message: {},
	createChat: () => {
		return { createdChat: {} };
	},
	getUserChats: () => {
		return { userChats: [] };
	},
	getChat: () => {
		return { singleChat: {} };
	},
	updateChat: () => {
		return { singleChat: {} };
	},
	getChatMessages: () => {
		return { chatMessages: [] };
	},
	markChatMessagesAsRead: () => {
		return { ok: '' };
	},
	createMessage: () => {
		return { message: {} };
	},
	onMessageRecieved: () => {},
};

const ChatContext = createContext<chatContextType>(chatContextDefaultValues);

export default ChatContext;
