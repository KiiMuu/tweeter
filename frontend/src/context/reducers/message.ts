import { Action } from '../actions/message';
import { IMessage } from '../../typings';
import { CreateMessageType } from '../types/message';

interface MessageState {
	createMessageLoading: boolean;
	createMessageError: string | null;
	message: IMessage;
}

export const initialMessageState: MessageState = {
	createMessageLoading: false,
	createMessageError: null,
	message: {},
};

export const messageReducer = (
	state = initialMessageState,
	action: Action
): MessageState => {
	switch (action.type) {
		case CreateMessageType.CREATE_MESSAGE_REQUEST:
			return {
				...state,
				createMessageLoading: true,
			};
		case CreateMessageType.CREATE_MESSAGE_SUCCESS:
			return {
				...state,
				createMessageLoading: false,
				message: action.payload,
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
