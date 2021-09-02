import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/contexts/user';
import useUserInfo from '../../hooks/useUserInfo';
import { UserInfoProps } from '../../typings';
import {
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemSecondaryAction,
	Button,
} from '@material-ui/core';

interface Props {
	user: UserInfoProps;
}

const UserCard: React.FC<Props> = ({ user }) => {
	const { currentUser } = useUserInfo();
	const { follow } = useContext(UserContext);

	return (
		<ListItem
			button
			component={Link}
			to={`/profile/${user?.username}`}
			key={user?._id}
		>
			<ListItemAvatar>
				<Avatar>
					<img
						src={user?.profilePic}
						alt={user?.name}
						width={40}
						height={40}
					/>
				</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={
					currentUser.user._id === user?._id ? 'You' : user?.name
				}
				secondary={`@${user?.username} ${
					user?.following.includes(currentUser.user._id)
						? 'Follows you'
						: ''
				}`}
			/>
			{currentUser.user._id === user?._id ? null : (
				<ListItemSecondaryAction>
					<Button
						size='small'
						variant='outlined'
						color='primary'
						onClick={() => follow(user?._id)}
					>
						{currentUser.user.following.includes(user?._id)
							? 'Following'
							: 'Follow'}
					</Button>
				</ListItemSecondaryAction>
			)}
		</ListItem>
	);
};

export default UserCard;
