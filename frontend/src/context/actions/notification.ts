import {
	GetNotificationsType,
	MarkAsReadType,
	MarkAllAsReadType,
	GetLastNotificationType,
} from '../types/notification';
import { INotification } from '../../typings';

interface GetNotificationsActionRequest {
	type: GetNotificationsType.NOTIFICATIONS_LIST_REQUEST;
}

interface GetNotificationsActionSuccess {
	type: GetNotificationsType.NOTIFICATIONS_LIST_SUCCESS;
	payload: INotification[];
}

interface GetNotificationsActionFail {
	type: GetNotificationsType.NOTIFICATIONS_LIST_FAIL;
	payload: string | null;
}

interface GetLastNotificationActionRequest {
	type: GetLastNotificationType.LAST_NOTIFICATION_REQUEST;
}

interface GetLastNotificationActionSuccess {
	type: GetLastNotificationType.LAST_NOTIFICATION_SUCCESS;
	payload: INotification;
}

interface GetLastNotificationActionFail {
	type: GetLastNotificationType.LAST_NOTIFICATION_FAIL;
	payload: string | null;
}

interface MarkAsReadActionRequest {
	type: MarkAsReadType.MARK_AS_READ_REQUEST;
}

interface MarkAsReadActionSuccess {
	type: MarkAsReadType.MARK_AS_READ_SUCCESS;
	payload: INotification;
}

interface MarkAsReadActionFail {
	type: MarkAsReadType.MARK_AS_READ_FAIL;
	payload: string | null;
}

interface MarkAllAsReadActionRequest {
	type: MarkAllAsReadType.MARK_ALL_AS_READ_REQUEST;
}

interface MarkAllAsReadActionSuccess {
	type: MarkAllAsReadType.MARK_ALL_AS_READ_SUCCESS;
	payload: { ok: string };
}

interface MarkAllAsReadActionFail {
	type: MarkAllAsReadType.MARK_ALL_AS_READ_FAIL;
	payload: string | null;
}

export type Action =
	| GetNotificationsActionRequest
	| GetNotificationsActionSuccess
	| GetNotificationsActionFail
	| GetLastNotificationActionRequest
	| GetLastNotificationActionSuccess
	| GetLastNotificationActionFail
	| MarkAsReadActionRequest
	| MarkAsReadActionSuccess
	| MarkAsReadActionFail
	| MarkAllAsReadActionRequest
	| MarkAllAsReadActionSuccess
	| MarkAllAsReadActionFail;
