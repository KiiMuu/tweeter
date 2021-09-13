import { useReducer } from 'react';
import axios from 'axios';
import NotificationContext from '../contexts/notification';
import {
	notificationReducer,
	initialNotificationState,
} from '../reducers/notification';
import {
	GetNotificationsType,
	MarkAllAsReadType,
	MarkAsReadType,
} from '../types/notification';
import useUserInfo from '../../hooks/useUserInfo';
import { INotification } from '../../typings';

const NotificationState = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(
		notificationReducer,
		initialNotificationState
	);
	const { currentUser } = useUserInfo();

	// * actions
	const getNotifications = async (
		searchTerm: string
	): Promise<{ notificationsList: INotification[] } | void> => {
		try {
			dispatch({
				type: GetNotificationsType.NOTIFICATIONS_LIST_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.post(
				`/getNotifications?searchTerm=${searchTerm}`,
				{},
				config
			);

			dispatch({
				type: GetNotificationsType.NOTIFICATIONS_LIST_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: GetNotificationsType.NOTIFICATIONS_LIST_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const markAsRead = async (
		id: string
	): Promise<{ notification: INotification } | void> => {
		try {
			dispatch({
				type: MarkAsReadType.MARK_AS_READ_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.put(`/${id}/markAsOpened`, {}, config);

			dispatch({
				type: MarkAsReadType.MARK_AS_READ_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: MarkAsReadType.MARK_AS_READ_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const markAllAsRead = async (): Promise<{ ok: string } | void> => {
		try {
			dispatch({
				type: MarkAllAsReadType.MARK_ALL_AS_READ_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.put(`/markAllAsOpened`, {}, config);

			dispatch({
				type: MarkAllAsReadType.MARK_ALL_AS_READ_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: MarkAllAsReadType.MARK_ALL_AS_READ_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	return (
		<NotificationContext.Provider
			value={{
				notificationsListLoading: state.notificationsListLoading,
				notificationsListError: state.notificationsListError,
				notificationsList: state.notificationsList,
				markAsReadLoading: state.markAsReadLoading,
				markAsReadError: state.markAsReadError,
				markAsReadSuccess: state.markAsReadSuccess,
				markAllAsReadLoading: state.markAllAsReadLoading,
				markAllAsReadError: state.markAllAsReadError,
				markAllAsReadSuccess: state.markAllAsReadSuccess,
				getNotifications,
				markAsRead,
				markAllAsRead,
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
};

export default NotificationState;
