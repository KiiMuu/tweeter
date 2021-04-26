import { useContext, useEffect } from 'react';
import AuthContext from '../context/contexts/authContext';

import NewsFeed from '../components/home/NewsFeed';
import HomeLayout from '../components/home/HomeLayout';

const Home: React.FC = () => {
    const authContext = useContext(AuthContext);
    const { getCurrentUser } = authContext;

    useEffect(() => {
        getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <HomeLayout>
            <NewsFeed />
        </HomeLayout>
    )
}

export default Home;