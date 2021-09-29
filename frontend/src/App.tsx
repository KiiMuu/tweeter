import { lazy, Suspense, useCallback, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { formatRelative } from 'date-fns';
import * as ROUTES from './constants/routes';
import FallbackScreen from './components/FallbackScreen';
import ProtectRoute from './helpers/ProtectRoute';
import NotificationContext from './context/contexts/notification';
import ChatContext from './context/contexts/chat';
import useUserInfo from './hooks/useUserInfo';
import SocketContext from './context/contexts/socket';
import useSocket from './hooks/useSocket';
import getNotificationText from './helpers/getNotificationText';
import { toNotificationBox } from './util';
import {
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
} from '@material-ui/core';

const Singup = lazy(() => import('./pages/signup'));
const Signin = lazy(() => import('./pages/signin'));
const Home = lazy(() => import('./pages/home'));
const SingleTweeta = lazy(() => import('./pages/singleTweeta'));
const Profile = lazy(() => import('./pages/profile'));
const Search = lazy(() => import('./pages/search'));
const Notifications = lazy(() => import('./pages/notifications'));
const Messages = lazy(() => import('./pages/messages'));
const ChatPage = lazy(() => import('./pages/chat'));
const WhatsHappening = lazy(() => import('./pages/WhatsHappening'));

const App: React.FC = () => {
	const { currentUser } = useUserInfo();
	const { getUserChats } = useContext(ChatContext);
	const { socket } = useContext(SocketContext);
	const { getNotifications, getLastNotification, lastNotification } =
		useContext(NotificationContext);

	socket?.emit('setup', currentUser?.user);
	useSocket('connected', () => console.log('socketIO connected!'));
	useSocket('notification received', getLastNotification);

	const notificationContent = useCallback(
		() => (
			<Link
				to={toNotificationBox(lastNotification)}
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
		[lastNotification]
	);

	useEffect(() => {
		if (!currentUser?.token) {
			<Redirect to='/signin' />;
		}
	}, [currentUser?.token]);
	useEffect(() => {
		lastNotification?.from &&
			toast.custom(notificationContent, {
				position: 'bottom-left',
				duration: 7000,
			});
	}, [lastNotification, notificationContent]);
	useEffect(() => {
		getNotifications('');
		getUserChats(true);
		// eslint-disable-next-line
	}, []);

	return (
		<Suspense fallback={<FallbackScreen />}>
			<Router>
				<Toaster />
				<Switch>
					<Route exact path={ROUTES.SIGNUP} component={Singup} />
					<Route exact path={ROUTES.SIGNIN} component={Signin} />
					<ProtectRoute exact path={ROUTES.HOME} component={Home} />
					<ProtectRoute
						exact
						path={ROUTES.SINGLE_TWEETA}
						component={SingleTweeta}
					/>
					<ProtectRoute
						exact
						path={ROUTES.MY_PROFILE}
						component={Profile}
					/>
					<ProtectRoute
						exact
						path={ROUTES.SEARCH}
						component={Search}
					/>
					<ProtectRoute
						exact
						path={ROUTES.NOTIFICATIONS}
						component={Notifications}
					/>
					<ProtectRoute
						exact
						path={ROUTES.MESSAGES}
						component={Messages}
					/>
					<ProtectRoute
						exact
						path={ROUTES.SINGLE_CHAT}
						component={ChatPage}
					/>
					<ProtectRoute
						exact
						path={ROUTES.WHATS_HAPPENING}
						component={WhatsHappening}
					/>
				</Switch>
			</Router>
		</Suspense>
	);
};

export default App;
