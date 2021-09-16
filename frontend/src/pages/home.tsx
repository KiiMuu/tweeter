import { useContext, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { formatRelative } from 'date-fns';
import SocketContext from '../context/contexts/socket';
import NotificationContext from '../context/contexts/notification';
import NewsFeed from '../components/home/NewsFeed';
import HomeLayout from '../components/home/HomeLayout';
import useSocket from '../hooks/useSocket';
import useUserInfo from '../hooks/useUserInfo';
import getNotificationText from '../helpers/getNotificationText';
import {
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
} from '@material-ui/core';

const Home: React.FC = () => {
	const { currentUser } = useUserInfo();
	const { socket } = useContext(SocketContext);
	const { getLastNotification, lastNotification } =
		useContext(NotificationContext);

	socket?.emit('setup', currentUser?.user);

	useSocket('connected', () => console.log('socketIO connected!'));
	useSocket('notification received', getLastNotification);

	const notificationContent = useCallback(
		() => (
			<Link
				to={`/${
					lastNotification?.type === 'follow' ? 'profile' : 'tweeta'
				}/${
					lastNotification?.type === 'follow'
						? lastNotification?.from.username
						: lastNotification?.entityId
				}`}
				style={{ textDecoration: 'none', color: 'inherit' }}
			>
				<ListItem
					style={{
						background: '#fff',
						borderRadius: '3px',
						color: '#000',
						boxShadow: 'rgb(0 0 0 / 30%) 0px 0px 3px 0px',
					}}
				>
					<ListItemAvatar>
						<Avatar>
							<img
								src={lastNotification?.from?.profilePic}
								alt={lastNotification?.from?.username}
								width={40}
								height={40}
							/>
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={getNotificationText(
							lastNotification?.from,
							lastNotification?.type
						)}
						secondary={formatRelative(
							new Date(lastNotification?.createdAt),
							new Date()
						)}
					/>
				</ListItem>
			</Link>
		),
		[
			lastNotification?.createdAt,
			lastNotification?.from,
			lastNotification?.type,
			lastNotification?.entityId,
		]
	);

	useEffect(() => {
		lastNotification?.from &&
			toast.custom(notificationContent, {
				position: 'bottom-left',
				duration: 5000,
			});
	}, [lastNotification?.from, notificationContent]);

	return (
		<HomeLayout>
			<NewsFeed />
		</HomeLayout>
	);
};

export default Home;
