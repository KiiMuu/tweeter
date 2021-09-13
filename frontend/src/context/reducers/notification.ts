import { Action } from '../actions/notification';
import { INotification } from '../../typings';
import {
	GetNotificationsType,
	MarkAsReadType,
	MarkAllAsReadType,
} from '../types/notification';

interface NotificationState {
	notificationsListLoading: boolean;
	notificationsListError: string | null;
	notificationsList: INotification[];
	markAsReadLoading: boolean;
	markAsReadError: null | string;
	markAsReadSuccess: boolean;
	markAllAsReadLoading: boolean;
	markAllAsReadError: null | string;
	markAllAsReadSuccess: boolean;
}

export const initialNotificationState: NotificationState = {
	notificationsListLoading: false,
	notificationsListError: null,
	notificationsList: [],
	markAsReadLoading: false,
	markAsReadError: null,
	markAsReadSuccess: false,
	markAllAsReadLoading: false,
	markAllAsReadError: null,
	markAllAsReadSuccess: false,
};

export const notificationReducer = (
	state = initialNotificationState,
	action: Action
): NotificationState => {
	switch (action.type) {
		case GetNotificationsType.NOTIFICATIONS_LIST_REQUEST:
			return {
				...state,
				notificationsListLoading: true,
			};
		case GetNotificationsType.NOTIFICATIONS_LIST_SUCCESS:
			return {
				...state,
				notificationsListLoading: false,
				notificationsList: action.payload,
			};
		case GetNotificationsType.NOTIFICATIONS_LIST_FAIL:
			return {
				...state,
				notificationsListLoading: false,
				notificationsListError: action.payload,
			};
		case MarkAsReadType.MARK_AS_READ_REQUEST:
			return {
				...state,
				markAsReadLoading: true,
			};
		case MarkAsReadType.MARK_AS_READ_SUCCESS:
			return {
				...state,
				markAsReadLoading: false,
				markAsReadSuccess: true,
				notificationsList: state.notificationsList.map(
					(n: INotification) =>
						n._id === action.payload._id
							? { ...action.payload, isOpened: true }
							: n
				),
			};
		case MarkAsReadType.MARK_AS_READ_FAIL:
			return {
				...state,
				markAsReadLoading: false,
				markAsReadError: action.payload,
			};
		case MarkAllAsReadType.MARK_ALL_AS_READ_REQUEST:
			return {
				...state,
				markAllAsReadLoading: true,
			};
		case MarkAllAsReadType.MARK_ALL_AS_READ_SUCCESS:
			return {
				...state,
				markAllAsReadLoading: false,
				markAllAsReadSuccess: true,
				notificationsList: state.notificationsList.map(
					(n: INotification) => ({ ...n, isOpened: true })
				),
			};
		case MarkAllAsReadType.MARK_ALL_AS_READ_FAIL:
			return {
				...state,
				markAllAsReadLoading: false,
				markAllAsReadError: action.payload,
			};
		default:
			return state;
	}
};
