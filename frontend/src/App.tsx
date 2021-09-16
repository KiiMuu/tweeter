import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import * as ROUTES from './constants/routes';
import FallbackScreen from './components/FallbackScreen';
import ProtectRoute from './helpers/ProtectRoute';

const Singup = lazy(() => import('./pages/signup'));
const Signin = lazy(() => import('./pages/signin'));
const Home = lazy(() => import('./pages/home'));
const SingleTweeta = lazy(() => import('./pages/singleTweeta'));
const Profile = lazy(() => import('./pages/profile'));
const Search = lazy(() => import('./pages/search'));
const Notifications = lazy(() => import('./pages/notifications'));

const App: React.FC = () => {
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
				</Switch>
			</Router>
		</Suspense>
	);
};

export default App;
