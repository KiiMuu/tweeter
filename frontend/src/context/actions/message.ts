import { CreateMessageType } from '../types/message';
import { IMessage } from '../../typings';

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

export type Action =
	| CreateMessageActionRequest
	| CreateMessageActionSuccess
	| CreateMessageActionFail;
