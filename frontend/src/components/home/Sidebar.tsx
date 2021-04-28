import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../context/contexts/authContext';

import { Sider } from '../../styles/lists';

import { Button, Tooltip, Zoom } from '@material-ui/core';
import { HiOutlineHome } from 'react-icons/hi';
import { BiMessageDetail } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { 
    IoMdNotificationsOutline, 
    IoLogoTwitter, 
    IoMdSearch, 
    IoMdLogOut,
} from 'react-icons/io';

const Sidebar: React.FC = () => {
    const authContext = useContext(AuthContext);
    const { logout } = authContext;

    const history = useHistory();

    const handleLogout = () => {
        logout();

        history.push('/signin');
    }

    return (
        <Sider>
            <ul>
                <li>
                    <Tooltip
                        title='Home' 
                        arrow 
                        TransitionComponent={Zoom}>
                        <Button variant='text' color='primary'>
                            <Link to='/'>
                                <IoLogoTwitter />
                            </Link>
                        </Button>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip
                        title='Home' 
                        arrow 
                        TransitionComponent={Zoom}>
                        <Button variant='text' color='primary'>
                            <Link to='/'>
                                <HiOutlineHome />
                            </Link>
                        </Button>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip
                        title='Notifications' 
                        arrow 
                        TransitionComponent={Zoom}>
                        <Button variant='text' color='primary'>
                            <Link to='/notifications'>
                                <IoMdNotificationsOutline />
                            </Link>
                        </Button>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip
                        title='Messages' 
                        arrow 
                        TransitionComponent={Zoom}>
                        <Button variant='text' color='primary'>
                            <Link to='/messages'>
                                <BiMessageDetail />
                            </Link>
                        </Button>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip
                        title='Search' 
                        arrow 
                        TransitionComponent={Zoom}>
                        <Button variant='text' color='primary'>
                            <Link to='/search'>
                                <IoMdSearch />
                            </Link>
                        </Button>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip
                        title='My Profile' 
                        arrow 
                        TransitionComponent={Zoom}>
                        <Button variant='text' color='primary'>
                            <Link to='/user/profile'>
                                <AiOutlineUser />
                            </Link>
                        </Button>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip
                        title='Sign Out' 
                        arrow 
                        TransitionComponent={Zoom}>
                        <Button onClick={handleLogout} variant='text' color='primary'>
                            <span>
                                <IoMdLogOut />
                            </span>
                        </Button>
                    </Tooltip>
                </li>
            </ul>
        </Sider>
    )
}

export default Sidebar;