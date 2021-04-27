import { useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';
import AuthContext from '../context/contexts/authContext';

const ProtectRoute = ({ component: Component, ...rest }: any) => {
    const history = useHistory();

    const authContext = useContext(AuthContext);
    const { isAuth } = authContext;

    return <Route
        {...rest}
        render={props => isAuth ? (
            <Component {...props} />
        ) : (
            history.push('/signin')
        )} 
    />;
}

export default ProtectRoute;