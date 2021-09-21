import { createContext } from 'react';
import { IChat, IMessage, UserInfoProps } from '../../typings';

type chatContextType = {
	createChatLoading: boolean;
	createChatSuccess: boolean;
	createChatError: string | null;
	userChatListLoading: boolean;
	userChatListError: string | null;
	userChats: IChat[];
	singleChatLoading: boolean;
	singleChatError: string | null;
	singleChat: IChat;
	updateChatLoading: boolean;
	updateChatError: string | null;
	chatMessagesLoading: boolean;
	chatMessagesError: string | null;
	chatMessages: IMessage[];
	markChatMessagesAsReadLoading: boolean;
	markChatMessagesAsReadError: string | null;
	// messages
	createMessageLoading: boolean;
	createMessageError: string | null;
	message: IMessage;

	createChat: (users: UserInfoProps[]) => { singleChat: IChat } | object;
	getUserChats: (unreadOnly: boolean) => { userChats: IChat[] } | object;
	getChat: (chatId: string) => { singleChat: IChat } | object;
	updateChat: (
		chatId: string,
		chatName: string
	) => { singleChat: IChat } | object;
	getChatMessages: (chatId: string) => { chatMessages: IMessage[] } | object;
	markChatMessagesAsRead: (chatId: string) => { ok: string } | object;
	createMessage: (
		content: string,
		chatId: string
	) => { message: IMessage } | object;
};

const chatContextDefaultValues: chatContextType = {
	createChatLoading: false,
	createChatError: null,
	createChatSuccess: false,
	userChatListLoading: false,
	userChatListError: null,
	userChats: [],
	singleChatLoading: false,
	singleChatError: null,
	singleChat: {},
	updateChatLoading: false,
	updateChatError: null,
	chatMessagesLoading: false,
	chatMessagesError: null,
	chatMessages: [],
	markChatMessagesAsReadLoading: false,
	markChatMessagesAsReadError: null,
	createMessageLoading: false,
	createMessageError: null,
	message: {},
	createChat: () => {
		return { chat: {} };
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
};

const ChatContext = createContext<chatContextType>(chatContextDefaultValues);

export default ChatContext;
