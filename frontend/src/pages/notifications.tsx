import { useContext, useEffect } from 'react';
import NotificationContext from '../context/contexts/notification';
import HomeLayout from '../components/home/HomeLayout';
import NotificationsList from '../components/notifications/NotificationsList';
import { PageTitle } from '../styles/headings';
import { Spin } from '../styles/spinners';
import { AlertStyles } from '../styles/notifiers';
import { Alert } from '@material-ui/lab';

const Notifications: React.FC = () => {
	const {
		notificationsListLoading,
		notificationsListError,
		notificationsList,
		getNotifications,
		markAsRead,
		markAllAsRead,
	} = useContext(NotificationContext);

	useEffect(() => {
		getNotifications('');
		// eslint-disable-next-line
	}, []);

	return (
		<HomeLayout>
			<PageTitle>Notifications</PageTitle>
			{notificationsListLoading ? (
				<span
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '30px',
						overflow: 'hidden',
					}}
				>
					<Spin></Spin>
				</span>
			) : notificationsListError ? (
				<AlertStyles style={{ marginTop: '20px' }}>
					<Alert severity='error' icon={false}>
						{notificationsListError}
					</Alert>
				</AlertStyles>
			) : (
				<NotificationsList
					notificationsList={notificationsList}
					markAsRead={markAsRead}
					markAllAsRead={markAllAsRead}
				/>
			)}
		</HomeLayout>
	);
};

export default Notifications;
