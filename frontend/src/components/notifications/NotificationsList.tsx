import { useCallback } from 'react';
import { INotification } from '../../typings';
import Notification from './Notification';
import { Alert } from '@material-ui/lab';
import { AlertStyles } from '../../styles/notifiers';
import { List, Button } from '@material-ui/core';
import { StyledNotifications } from '../../styles/lists';

interface Props {
	notificationsList: INotification[];
	markAsRead: (id: string) => object | { notification: INotification };
	markAllAsRead: () => object | { ok: string };
}

const NotificationsList: React.FC<Props> = ({
	notificationsList,
	markAsRead,
	markAllAsRead,
}) => {
	const handleMarkAllAsRead = useCallback(() => {
		markAllAsRead();
	}, [markAllAsRead]);

	const areAllNotificationsOpened = () =>
		notificationsList?.every(n => n.isOpened === true);

	return (
		<StyledNotifications>
			{notificationsList?.length === 0 ? (
				<AlertStyles style={{ marginTop: '20px' }}>
					<Alert severity='info' icon={false}>
						Your notifications will be listed here.
					</Alert>
				</AlertStyles>
			) : (
				<List>
					<div className='markAllButton'>
						<Button
							disabled={areAllNotificationsOpened()}
							color='primary'
							variant='outlined'
							size='small'
							onClick={() => handleMarkAllAsRead()}
						>
							Mark All As Read
						</Button>
					</div>
					{notificationsList?.map((notification: INotification) => (
						<Notification
							notification={notification}
							key={notification._id}
							markAsRead={markAsRead}
						/>
					))}
				</List>
			)}
		</StyledNotifications>
	);
};

export default NotificationsList;
