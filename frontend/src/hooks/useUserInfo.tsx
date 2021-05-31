import { useContext } from 'react';
import UserContext from '../context/contexts/userContext';

const useUserInfo = () => {
    const { user } = useContext(UserContext);
    
    return { user }
}

export default useUserInfo;