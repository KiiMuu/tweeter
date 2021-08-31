import { useContext } from 'react';
import UserContext from '../context/contexts/user';

const useUserInfo = () => {
	const { currentUser } = useContext(UserContext);

	return { currentUser };
};

export default useUserInfo;
