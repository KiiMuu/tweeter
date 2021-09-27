import {
	CreateChatType,
	GetChatMessagesType,
	GetChatType,
	GetUserChatsType,
	UpdateChatType,
	MarkChatAsReadType,
	CreateMessageType,
} from '../types/chat';
import { IChat, IMessage } from '../../typings';

interface CreateChatActionRequest {
	type: CreateChatType.CREATE_CHAT_REQUEST;
}

interface CreateChatActionSuccess {
	type: CreateChatType.CREATE_CHAT_SUCCESS;
	payload: IChat;
}

interface CreateChatActionFail {
	type: CreateChatType.CREATE_CHAT_FAIL;
	payload: string | null;
}

interface GetUserChatsActionRequest {
	type: GetUserChatsType.GET_USER_CHATS_REQUEST;
}

interface GetUserChatsActionSuccess {
	type: GetUserChatsType.GET_USER_CHATS_SUCCESS;
	payload: IChat[];
}

interface GetUserChatsActionFail {
	type: GetUserChatsType.GET_USER_CHATS_FAIL;
	payload: string | null;
}

interface GetChatActionRequest {
	type: GetChatType.GET_CHAT_REQUEST;
}

interface GetChatActionSuccess {
	type: GetChatType.GET_CHAT_SUCCESS;
	payload: IChat;
}

interface GetChatActionFail {
	type: GetChatType.GET_CHAT_FAIL;
	payload: string | null;
}

interface UpdateChatActionRequest {
	type: UpdateChatType.UPDATE_CHAT_REQUEST;
}

interface UpdateChatActionSuccess {
	type: UpdateChatType.UPDATE_CHAT_SUCCESS;
	payload: IChat;
}

interface UpdateChatActionFail {
	type: UpdateChatType.UPDATE_CHAT_FAIL;
	payload: string | null;
}

interface GetChatMessagesActionRequest {
	type: GetChatMessagesType.GET_CHAT_MESSAGES_REQUEST;
}

interface GetChatMessagesActionSuccess {
	type: GetChatMessagesType.GET_CHAT_MESSAGES_SUCCESS;
	payload: IMessage;
}

interface GetChatMessagesActionFail {
	type: GetChatMessagesType.GET_CHAT_MESSAGES_FAIL;
	payload: string | null;
}

interface MarkChatAsReadActionRequest {
	type: MarkChatAsReadType.MARK_CHAT_AS_READ_REQUEST;
}

interface MarkChatAsReadActionSuccess {
	type: MarkChatAsReadType.MARK_CHAT_AS_READ_SUCCESS;
	payload: IChat;
}

interface MarkChatAsReadActionFail {
	type: MarkChatAsReadType.MARK_CHAT_AS_READ_FAIL;
	payload: string | null;
}

// messages
interface CreateMessageActionRequest {
	type: CreateMessageType.CREATE_MESSAGE_REQUEST;
}

interface CreateMessageActionSuccess {
	type: CreateMessageType.CREATE_MESSAGE_SUCCESS;
	payload: IMessage;
}

interface CreateMessageActionFail {
	type: CreateMessageType.CREATE_MESSAGE_FAIL;
	payload: string | null;
}

interface MessageRecievedAction {
	type: CreateMessageType.MESSAGE_RECIEVED;
	payload: IMessage;
}

export type Action =
	| CreateChatActionRequest
	| CreateChatActionSuccess
	| CreateChatActionFail
	| GetUserChatsActionRequest
	| GetUserChatsActionSuccess
	| GetUserChatsActionFail
	| GetChatActionRequest
	| GetChatActionSuccess
	| GetChatActionFail
	| UpdateChatActionRequest
	| UpdateChatActionSuccess
	| UpdateChatActionFail
	| GetChatMessagesActionRequest
	| GetChatMessagesActionSuccess
	| GetChatMessagesActionFail
	| MarkChatAsReadActionRequest
	| MarkChatAsReadActionSuccess
	| MarkChatAsReadActionFail
	| CreateMessageActionRequest
	| CreateMessageActionSuccess
	| CreateMessageActionFail
	| MessageRecievedAction;
