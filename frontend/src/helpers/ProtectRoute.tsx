import { Route, Redirect } from 'react-router-dom';
import useUserInfo from '../hooks/useUserInfo';

const ProtectRoute = ({ component: Component, ...rest }: any) => {
	const { currentUser } = useUserInfo();

	return (
		<Route
			{...rest}
			render={props =>
				currentUser ? (
					<Component {...props} />
				) : (
					<Redirect to='/signin' />
				)
			}
		/>
	);
};

export default ProtectRoute;
