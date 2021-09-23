import { lazy, Suspense, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import * as ROUTES from './constants/routes';
import FallbackScreen from './components/FallbackScreen';
import ProtectRoute from './helpers/ProtectRoute';
import NotificationContext from './context/contexts/notification';
import ChatContext from './context/contexts/chat';

const Singup = lazy(() => import('./pages/signup'));
const Signin = lazy(() => import('./pages/signin'));
const Home = lazy(() => import('./pages/home'));
const SingleTweeta = lazy(() => import('./pages/singleTweeta'));
const Profile = lazy(() => import('./pages/profile'));
const Search = lazy(() => import('./pages/search'));
const Notifications = lazy(() => import('./pages/notifications'));
const Messages = lazy(() => import('./pages/messages'));
const ChatPage = lazy(() => import('./pages/chat'));

const App: React.FC = () => {
	const { getNotifications } = useContext(NotificationContext);
	const { getUserChats } = useContext(ChatContext);

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
				</Switch>
			</Router>
		</Suspense>
	);
};

export default App;
