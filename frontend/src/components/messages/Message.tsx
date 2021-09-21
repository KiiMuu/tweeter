import { IMessage, UserInfoProps } from '../../typings';
import { MessageBox } from '../../styles/messages';
import useUserInfo from '../../hooks/useUserInfo';
import { formatRelative } from 'date-fns';
import { Typography } from '@material-ui/core';

interface Props {
	message: IMessage;
}

const Message: React.FC<Props> = ({ message }) => {
	const { currentUser } = useUserInfo();
	console.log({ message });

	return (
		<MessageBox
			me={currentUser?.user?.username}
			you={message?.sender?.username}
		>
			<Typography variant='subtitle1' display='block' gutterBottom>
				{message?.content}
			</Typography>
			<Typography variant='caption' display='block' gutterBottom>
				{formatRelative(new Date(message?.createdAt), new Date())}
			</Typography>
			<Typography variant='caption' display='block'>
				{message?.sender?.username === currentUser?.user?.username &&
					message?.readBy?.map(
						(user: UserInfoProps) => `seen by ${user.username}`
					)}
			</Typography>
		</MessageBox>
	);
};

export default Message;
