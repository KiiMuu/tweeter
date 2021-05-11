import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import FallbackScreen from './components/FallbackScreen';
import ProtectRoute from './helpers/ProtectRoute';

const Singup = lazy(() => import('./pages/signup'));
const Signin = lazy(() => import('./pages/signin'));
const Home = lazy(() => import('./pages/home'));
const SingleTweeta = lazy(() => import('./pages/singleTweeta'));


const App: React.FC = () => {
    return (
        <Suspense fallback={<FallbackScreen />}>
            <Router>
                <Switch>
                    <Route exact path={ROUTES.SIGNUP} component={Singup} />
                    <Route exact path={ROUTES.SIGNIN} component={Signin} />
                    <ProtectRoute exact path={ROUTES.HOME} component={Home} />
                    <ProtectRoute exact path={ROUTES.SINGLE_TWEETA} component={SingleTweeta} />
                </Switch>
            </Router>
        </Suspense>
    )
}

export default App;