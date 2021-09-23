import { IMessage } from '../../typings';
import { MessageBox } from '../../styles/messages';
import useUserInfo from '../../hooks/useUserInfo';
import { formatRelative } from 'date-fns';
import { Typography } from '@material-ui/core';
import { BsCheckAll } from 'react-icons/bs';

interface Props {
	message: IMessage;
}

const Message: React.FC<Props> = ({ message }) => {
	const { currentUser } = useUserInfo();

	return (
		<MessageBox
			current={currentUser?.user?.username}
			you={message?.sender?.username}
		>
			<div className='msg'>
				<Typography
					variant='caption'
					display='block'
					className='username'
				>
					{message?.sender?.username === currentUser?.user?.username
						? 'You'
						: message?.sender?.username}
				</Typography>
				<Typography variant='subtitle1' display='block'>
					{message?.content}
				</Typography>
			</div>
			<div className='msgDateSeen'>
				<Typography variant='caption' display='block' gutterBottom>
					{formatRelative(new Date(message?.createdAt), new Date())}
				</Typography>
				<Typography variant='caption' display='block'>
					{message?.sender?.username ===
						currentUser?.user?.username &&
						message?.readBy?.length > 1 && (
							<BsCheckAll
								title='seen'
								size={18}
								color='var(--mainColor)'
							/>
						)}
				</Typography>
			</div>
		</MessageBox>
	);
};

export default Message;
