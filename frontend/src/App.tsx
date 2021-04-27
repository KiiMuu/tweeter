import { lazy, Suspense, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import FallbackScreen from './components/FallbackScreen';
import AuthContext from './context/contexts/authContext';
import ProtectRoute from './helpers/ProtectRoute';

const Singup = lazy(() => import('./pages/signup'));
const Signin = lazy(() => import('./pages/signin'));
const Home = lazy(() => import('./pages/home'));


const App: React.FC = () => {
    const authContext = useContext(AuthContext);
    const { getCurrentUser } = authContext;

    useEffect(() => {
        getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <Suspense fallback={<FallbackScreen />}>
            <Router>
                <Switch>
                    <ProtectRoute exact path={ROUTES.HOME} component={Home} />
                    <Route exact path={ROUTES.SIGNUP} component={Singup} />
                    <Route exact path={ROUTES.SIGNIN} component={Signin} />
                </Switch>
            </Router>
        </Suspense>
    )
}

export default App;