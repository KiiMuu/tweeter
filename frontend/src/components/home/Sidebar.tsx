import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Sider } from '../../styles/lists';
import { Button, Tooltip, Zoom, Badge, IconButton } from '@material-ui/core';
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
import { IChat } from '../../typings';
import ChatContext from '../../context/contexts/chat';

const Sidebar: React.FC = () => {
	const { logout } = useContext(UserContext);
	const { notificationsList } = useContext(NotificationContext);
	const { userChats } = useContext(ChatContext);
	const { currentUser } = useUserInfo();
	const history = useHistory();

	let unreadNotifications: Array<boolean> = [];
	notificationsList?.forEach(n => {
		if (!n.isOpened) {
			unreadNotifications.push(n.isOpened);
		}
	});

	let unreadMesages: IChat[] = [];
	userChats?.forEach((chat: IChat) => {
		if (
			chat.latestMessage &&
			!chat.latestMessage.readBy.includes(currentUser?.user?._id)
		) {
			unreadMesages.push(chat);
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
						<IconButton>
							<Link to='/'>
								<IoLogoTwitter />
							</Link>
						</IconButton>
					</Tooltip>
				</li>
				<li>
					<Link to='/'>
						<Button
							variant='text'
							color='primary'
							startIcon={<HiOutlineHome />}
						>
							<span className='linkTitle'>Home</span>
						</Button>
					</Link>
				</li>
				<li>
					<Badge
						color='secondary'
						badgeContent={unreadNotifications?.length}
					>
						<Link to='/notifications'>
							<Button
								variant='text'
								color='primary'
								startIcon={<IoMdNotificationsOutline />}
							>
								<span className='linkTitle'>Notifications</span>
							</Button>
						</Link>
					</Badge>
				</li>
				<li>
					<Badge
						color='secondary'
						badgeContent={unreadMesages?.length}
					>
						<Link to='/messages'>
							<Button
								variant='text'
								color='primary'
								startIcon={<BiMessageDetail />}
							>
								<span className='linkTitle'>Messages</span>
							</Button>
						</Link>
					</Badge>
				</li>
				<li>
					<Link to='/search'>
						<Button
							variant='text'
							color='primary'
							startIcon={<IoMdSearch />}
						>
							<span className='linkTitle'>Search</span>
						</Button>
					</Link>
				</li>
				<li>
					<Link to={`/profile/${currentUser?.user.username}`}>
						<Button
							variant='text'
							color='primary'
							startIcon={<AiOutlineUser />}
						>
							<span className='linkTitle'>My Profile</span>
						</Button>
					</Link>
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
			<ul className='linkIcon'>
				<li>
					<Tooltip title='Home' arrow TransitionComponent={Zoom}>
						<IconButton>
							<Link to='/'>
								<IoLogoTwitter />
							</Link>
						</IconButton>
					</Tooltip>
				</li>
				<li>
					<Tooltip title='Home' arrow TransitionComponent={Zoom}>
						<IconButton>
							<Link to='/'>
								<HiOutlineHome />
							</Link>
						</IconButton>
					</Tooltip>
				</li>
				<li>
					<Badge
						color='secondary'
						badgeContent={unreadNotifications?.length}
						overlap='circle'
					>
						<Tooltip
							title='Notifications'
							arrow
							TransitionComponent={Zoom}
						>
							<IconButton>
								<Link to='/notifications'>
									<IoMdNotificationsOutline />
								</Link>
							</IconButton>
						</Tooltip>
					</Badge>
				</li>
				<li>
					<Badge
						color='secondary'
						badgeContent={unreadMesages?.length}
						overlap='circle'
					>
						<Tooltip
							title='Messages'
							arrow
							TransitionComponent={Zoom}
						>
							<IconButton>
								<Link to='/messages'>
									<BiMessageDetail />
								</Link>
							</IconButton>
						</Tooltip>
					</Badge>
				</li>
				<li>
					<Tooltip title='Search' arrow TransitionComponent={Zoom}>
						<IconButton>
							<Link to='/search'>
								<IoMdSearch />
							</Link>
						</IconButton>
					</Tooltip>
				</li>
				<li>
					<Tooltip
						title='My Profile'
						arrow
						TransitionComponent={Zoom}
					>
						<IconButton>
							<Link to={`/profile/${currentUser?.user.username}`}>
								<AiOutlineUser />
							</Link>
						</IconButton>
					</Tooltip>
				</li>
				<li>
					<Tooltip title='Sign Out' arrow TransitionComponent={Zoom}>
						<IconButton onClick={handleLogout}>
							<IoMdLogOut />
						</IconButton>
					</Tooltip>
				</li>
			</ul>
		</Sider>
	);
};

export default Sidebar;
