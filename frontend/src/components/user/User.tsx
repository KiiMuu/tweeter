import { UserInfoProps } from '../../typings';
import {
	ListItem,
	Checkbox,
	ListItemSecondaryAction,
	ListItemAvatar,
	Avatar,
	ListItemText,
} from '@material-ui/core';

interface Props {
	user: UserInfoProps;
	handleToggle: (userId: string) => () => void;
	selectedUsers: string[];
}

const User: React.FC<Props> = ({ user, handleToggle, selectedUsers }) => {
	return (
		<ListItem button disableGutters>
			<ListItemAvatar>
				<Avatar>
					<img
						src={user?.profilePic}
						alt={user?.username}
						width={40}
						height={40}
					/>
				</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={user?.name}
				secondary={`@${user?.username}`}
			/>
			<ListItemSecondaryAction>
				<Checkbox
					onChange={handleToggle(user?._id)}
					checked={selectedUsers.indexOf(user?._id) !== -1}
					inputProps={{ 'aria-labelledby': user?._id }}
				/>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default User;
