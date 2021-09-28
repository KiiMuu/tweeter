import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IconButton, Tooltip, Zoom, Badge } from '@material-ui/core';
import { StyledMobNavigation } from '../../styles/lists';
import { BiMessageDetail } from 'react-icons/bi';
import { HiOutlineHome } from 'react-icons/hi';
import { AiOutlineUser, AiOutlineFire } from 'react-icons/ai';
import {
	IoMdNotificationsOutline,
	IoMdSearch,
	IoMdLogOut,
} from 'react-icons/io';
import useUserInfo from '../../hooks/useUserInfo';
import UserContext from '../../context/contexts/user';
import NotificationContext from '../../context/contexts/notification';
import { IChat } from '../../typings';
import ChatContext from '../../context/contexts/chat';

const MobNavigation = () => {
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
		<StyledMobNavigation>
			<ul>
				<li>
					<Tooltip title='Home' arrow TransitionComponent={Zoom}>
						<IconButton>
							<Link to='/'>
								<HiOutlineHome size={18} />
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
									<IoMdNotificationsOutline size={18} />
								</Link>
							</IconButton>
						</Tooltip>
					</Badge>
				</li>
				<li>
					<Tooltip
						title='Whats Happening'
						arrow
						TransitionComponent={Zoom}
					>
						<IconButton>
							<Link to='/whats-happening'>
								<AiOutlineFire size={18} />
							</Link>
						</IconButton>
					</Tooltip>
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
									<BiMessageDetail size={18} />
								</Link>
							</IconButton>
						</Tooltip>
					</Badge>
				</li>
				<li>
					<Tooltip title='Search' arrow TransitionComponent={Zoom}>
						<IconButton>
							<Link to='/search'>
								<IoMdSearch size={18} />
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
								<AiOutlineUser size={18} />
							</Link>
						</IconButton>
					</Tooltip>
				</li>
				<li>
					<Tooltip title='Sign Out' arrow TransitionComponent={Zoom}>
						<IconButton onClick={handleLogout}>
							<IoMdLogOut size={18} />
						</IconButton>
					</Tooltip>
				</li>
			</ul>
		</StyledMobNavigation>
	);
};

export default MobNavigation;
