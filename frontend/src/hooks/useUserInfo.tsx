import { useContext } from 'react';
import UserContext from '../context/contexts/userContext';

const useUserInfo = () => {
	const { user: currentUser } = useContext(UserContext);

	return { currentUser };
};

export default useUserInfo;
