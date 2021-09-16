import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Sider } from '../../styles/lists';
import { Button, Tooltip, Zoom, Badge } from '@material-ui/core';
import { HiOutlineHome } from 'react-icons/hi';
import { BiMessageDetail } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import {
	IoMdNotificationsOutline,
	IoLogoTwitter,
	IoMdSearch,
	IoMdLogOut,
} from 'react-icons/io';
import useUserInfo from '../../hooks/useUserInfo';
import UserContext from '../../context/contexts/user';
import NotificationContext from '../../context/contexts/notification';

const Sidebar: React.FC = () => {
	const { logout } = useContext(UserContext);
	const { notificationsList } = useContext(NotificationContext);
	const { currentUser } = useUserInfo();
	const history = useHistory();

	let unreadNotifications: Array<boolean> = [];
	notificationsList?.forEach(n => {
		if (!n.isOpened) {
			unreadNotifications.push(n.isOpened);
		}
	});

	const handleLogout = () => {
		logout();

		history.push('/signin');
	};

	return (
		<Sider>
			<ul>
				<li>
					<Tooltip title='Home' arrow TransitionComponent={Zoom}>
						<Button variant='text' color='primary'>
							<Link to='/'>
								<IoLogoTwitter />
							</Link>
						</Button>
					</Tooltip>
				</li>
				<li>
					<Button
						variant='text'
						color='primary'
						startIcon={<HiOutlineHome />}
					>
						<Link to='/'>
							<span className='linkTitle'>Home</span>
						</Link>
					</Button>
				</li>
				<li>
					<Badge
						color='secondary'
						badgeContent={unreadNotifications?.length}
					>
						<Button
							variant='text'
							color='primary'
							startIcon={<IoMdNotificationsOutline />}
						>
							<Link to='/notifications'>
								<span className='linkTitle'>Notifications</span>
							</Link>
						</Button>
					</Badge>
				</li>
				<li>
					<Button
						variant='text'
						color='primary'
						startIcon={<BiMessageDetail />}
					>
						<Link to='/messages'>
							<span className='linkTitle'>Messages</span>
						</Link>
					</Button>
				</li>
				<li>
					<Button
						variant='text'
						color='primary'
						startIcon={<IoMdSearch />}
					>
						<Link to='/search'>
							<span className='linkTitle'>Search</span>
						</Link>
					</Button>
				</li>
				<li>
					<Button
						variant='text'
						color='primary'
						startIcon={<AiOutlineUser />}
					>
						<Link to={`/profile/${currentUser?.user.username}`}>
							<span className='linkTitle'>My Profile</span>
						</Link>
					</Button>
				</li>
				<li>
					<Button
						onClick={handleLogout}
						variant='text'
						color='primary'
						startIcon={<IoMdLogOut />}
					>
						<span className='linkTitle'>Sign Out</span>
					</Button>
				</li>
			</ul>
		</Sider>
	);
};

export default Sidebar;
