import { useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';
import UserContext from '../context/contexts/userContext';

const ProtectRoute = ({ component: Component, ...rest }: any) => {
	const history = useHistory();

	const authContext = useContext(UserContext);
	const { currentUser } = authContext;

	return (
		<Route
			{...rest}
			render={props =>
				currentUser ? <Component {...props} /> : history.push('/signin')
			}
		/>
	);
};

export default ProtectRoute;
