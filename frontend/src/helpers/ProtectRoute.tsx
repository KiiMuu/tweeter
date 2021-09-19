import { Route, useHistory } from 'react-router-dom';
import useUserInfo from '../hooks/useUserInfo';

const ProtectRoute = ({ component: Component, ...rest }: any) => {
	const history = useHistory();

	const { currentUser } = useUserInfo();

	return (
		<Route
			{...rest}
			render={props =>
				currentUser?.token ? (
					<Component {...props} />
				) : (
					history.push('/signin')
				)
			}
		/>
	);
};

export default ProtectRoute;
