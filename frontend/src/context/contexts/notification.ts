import { createContext } from 'react';
import { INotification } from '../../typings';

type notificationContextType = {
	notificationsListLoading: boolean;
	notificationsListError: string | null;
	notificationsList: INotification[];
	lastNotificationsLoading: boolean;
	lastNotificationsError: string | null;
	lastNotification: INotification;
	markAsReadLoading: boolean;
	markAsReadError: null | string;
	markAsReadSuccess: boolean;
	markAllAsReadLoading: boolean;
	markAllAsReadError: null | string;
	markAllAsReadSuccess: boolean;
	getNotifications: (
		searchTerm: string
	) => { notificationsList: INotification[] } | object;
	getLastNotification: () => { lastNotification: INotification } | object;
	markAsRead: (id: string) => { notification: INotification } | object;
	markAllAsRead: () => { ok: string } | object;
};

const notificationContextDefaultValues: notificationContextType = {
	notificationsListLoading: false,
	notificationsListError: null,
	notificationsList: [],
	lastNotificationsLoading: false,
	lastNotificationsError: null,
	lastNotification: {},
	markAsReadLoading: false,
	markAsReadError: null,
	markAsReadSuccess: false,
	markAllAsReadLoading: false,
	markAllAsReadError: null,
	markAllAsReadSuccess: false,
	getNotifications: () => {
		return { notificationsList: [] };
	},
	getLastNotification: () => {
		return { lastNotification: {} };
	},
	markAsRead: () => {
		return { notification: {} };
	},
	markAllAsRead: () => {
		return { ok: '' };
	},
};

const NotificationContext = createContext<notificationContextType>(
	notificationContextDefaultValues
);

export default NotificationContext;
