import { Action } from '../actions/chat';
import { IChat, IMessage } from '../../typings';
import {
	CreateChatType,
	GetChatMessagesType,
	GetChatType,
	GetUserChatsType,
	UpdateChatType,
	MarkChatAsReadType,
	CreateMessageType,
} from '../types/chat';

interface ChatState {
	createChatLoading: boolean;
	createChatError: string | null;
	createChatSuccess: boolean;
	createdChat: IChat;
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
	createMessageSuccess: boolean;
	createMessageError: string | null;
	message: IMessage;
}

export const initialChatState: ChatState = {
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
	updateChatError: null,
	chatMessagesLoading: false,
	chatMessagesError: null,
	chatMessages: [],
	markChatMessagesAsReadLoading: false,
	markChatMessagesAsReadError: null,
	// messages
	createMessageLoading: false,
	createMessageSuccess: false,
	createMessageError: null,
	message: {},
};

export const chatReducer = (
	state = initialChatState,
	action: Action
): ChatState => {
	switch (action.type) {
		case CreateChatType.CREATE_CHAT_REQUEST:
			return {
				...state,
				createChatLoading: true,
			};
		case CreateChatType.CREATE_CHAT_SUCCESS:
			return {
				...state,
				createChatLoading: false,
				createChatSuccess: true,
				singleChat: action.payload,
			};
		case CreateChatType.CREATE_CHAT_FAIL:
			return {
				...state,
				createChatLoading: false,
				createChatError: action.payload,
			};
		case GetChatMessagesType.GET_CHAT_MESSAGES_REQUEST:
			return {
				...state,
				chatMessagesLoading: true,
			};
		case GetChatMessagesType.GET_CHAT_MESSAGES_SUCCESS:
			return {
				...state,
				chatMessagesLoading: false,
				chatMessages: action.payload,
			};
		case GetChatMessagesType.GET_CHAT_MESSAGES_FAIL:
			return {
				...state,
				chatMessagesLoading: false,
				chatMessagesError: action.payload,
			};
		case GetChatType.GET_CHAT_REQUEST:
			return {
				...state,
				singleChatLoading: true,
			};
		case GetChatType.GET_CHAT_SUCCESS:
			return {
				...state,
				singleChatLoading: false,
				singleChat: action.payload,
			};
		case GetChatType.GET_CHAT_FAIL:
			return {
				...state,
				singleChatLoading: false,
				singleChatError: action.payload,
			};
		case GetUserChatsType.GET_USER_CHATS_REQUEST:
			return {
				...state,
				userChatListLoading: true,
			};
		case GetUserChatsType.GET_USER_CHATS_SUCCESS:
			return {
				...state,
				userChatListLoading: false,
				userChats: action.payload,
			};
		case GetUserChatsType.GET_USER_CHATS_FAIL:
			return {
				...state,
				userChatListLoading: false,
				userChatListError: action.payload,
			};
		case UpdateChatType.UPDATE_CHAT_REQUEST:
			return {
				...state,
				updateChatLoading: true,
			};
		case UpdateChatType.UPDATE_CHAT_SUCCESS:
			return {
				...state,
				updateChatLoading: false,
				singleChat: action.payload,
			};
		case UpdateChatType.UPDATE_CHAT_FAIL:
			return {
				...state,
				updateChatLoading: false,
				updateChatError: action.payload,
			};
		case MarkChatAsReadType.MARK_CHAT_AS_READ_REQUEST:
			return {
				...state,
				markChatMessagesAsReadLoading: true,
			};
		case MarkChatAsReadType.MARK_CHAT_AS_READ_SUCCESS:
			return {
				...state,
				markChatMessagesAsReadLoading: false,
				// singleChat: action.payload,
			};
		case MarkChatAsReadType.MARK_CHAT_AS_READ_FAIL:
			return {
				...state,
				markChatMessagesAsReadLoading: false,
				markChatMessagesAsReadError: action.payload,
			};
		// messages
		case CreateMessageType.CREATE_MESSAGE_REQUEST:
			return {
				...state,
				createMessageLoading: true,
			};
		case CreateMessageType.CREATE_MESSAGE_SUCCESS:
			return {
				...state,
				createMessageLoading: false,
				createMessageSuccess: true,
				message: action.payload,
				chatMessages: [...state.chatMessages, action.payload],
			};
		case CreateMessageType.CREATE_MESSAGE_FAIL:
			return {
				...state,
				createMessageLoading: false,
				createMessageError: action.payload,
			};
		default:
			return state;
	}
};
