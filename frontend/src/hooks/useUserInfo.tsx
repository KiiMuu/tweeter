import { useContext } from 'react';
import UserContext from '../context/contexts/userContext';

const useUserInfo = () => {
	const { currentUser } = useContext(UserContext);

	return { currentUser };
};

export default useUserInfo;
