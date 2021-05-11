import { useContext } from 'react';
import AuthContext from '../context/contexts/authContext';

const useUserInfo = () => {
    const { user } = useContext(AuthContext);
    
    return { user }
}

export default useUserInfo;