import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { INotification } from '../../typings';
import { formatRelative } from 'date-fns';
import getNotificationText from '../../helpers/getNotificationText';
import {
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	ListItemSecondaryAction,
	Button,
} from '@material-ui/core';

interface Props {
	notification: INotification;
	markAsRead: (id: string) => object | { notification: INotification };
}

const Notification: React.FC<Props> = ({ notification, markAsRead }) => {
	const handleMarkAsRead = useCallback(() => {
		markAsRead(notification?._id);
	}, [markAsRead, notification]);

	return (
		<ListItem
			button
			component={Link}
			to={`/${notification?.type === 'follow' ? 'profile' : 'tweeta'}/${
				notification?.type === 'follow'
					? notification?.from.username
					: notification?.entityId
			}`}
			style={{
				backgroundColor: notification?.isOpened
					? ''
					: 'rgba(29, 161, 242, .15)',
			}}
			onClick={() => handleMarkAsRead()}
		>
			<ListItemAvatar>
				<Avatar>
					<img
						src={notification?.from.profilePic}
						alt={notification?.from.username}
						width={40}
						height={40}
					/>
				</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={getNotificationText(
					notification?.from,
					notification?.type
				)}
				secondary={formatRelative(
					new Date(notification?.createdAt),
					new Date()
				)}
			/>
			<ListItemSecondaryAction>
				<Button
					disabled={notification?.isOpened === true}
					color='primary'
					onClick={() => handleMarkAsRead()}
				>
					Read
				</Button>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

const areEqual = (prevProps: INotification, nextProps: INotification) => {
	if (
		prevProps.notification._id === nextProps.notification._id &&
		prevProps.notification.type === nextProps.notification.type &&
		prevProps.notification.to._id === nextProps.notification.from._id &&
		prevProps.notification.entityId === nextProps.notification.entityId &&
		prevProps.notification.isOpened === nextProps.notification.isOpened
	) {
		return true;
	} else {
		return false;
	}
};

export default memo(Notification, areEqual);
