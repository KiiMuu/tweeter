import { useContext } from 'react';
import AuthContext from '../context/contexts/authContext';

const useUserInfo = () => {
    const { userInfo } = useContext(AuthContext);
    
    return { userInfo }
}

export default useUserInfo;