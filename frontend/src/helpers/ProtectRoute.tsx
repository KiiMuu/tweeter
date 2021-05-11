import { useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';
import AuthContext from '../context/contexts/authContext';

const ProtectRoute = ({ component: Component, ...rest }: any) => {
    const history = useHistory();

    const authContext = useContext(AuthContext);
    const { user } = authContext;

    return <Route
        {...rest}
        render={props => user?.user ? (
            <Component {...props} />
        ) : (
            history.push('/signin')
        )} 
    />;
}

export default ProtectRoute;