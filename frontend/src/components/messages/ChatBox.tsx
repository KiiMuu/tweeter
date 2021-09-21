import { IChat, IMessage, UserInfoProps } from '../../typings';
import MessageInput from './MessageInput';
import MessagesArea from './MessagesArea';
import { StyledChatBox } from '../../styles/messages';
import { Typography } from '@material-ui/core';

interface Props {
	singleChat: IChat;
	chatMessages: IMessage[];
	chatMessagesLoading: boolean;
	chatMessagesError: string | null;
}

const ChatBox: React.FC<Props> = ({
	singleChat,
	chatMessages,
	chatMessagesLoading,
	chatMessagesError,
}) => {
	return (
		<StyledChatBox>
			<div className='heading'>
				<Typography variant='h5'>
					{singleChat?.isGroupChat
						? singleChat?.chatName
						: 'name here'}
				</Typography>
				{singleChat?.isGroupChat &&
					singleChat?.users?.map((user: UserInfoProps) => (
						<Typography
							key={user._id}
							variant='caption'
							gutterBottom
						>
							{user?.username}
							{user?.username ===
							singleChat?.users[singleChat?.users?.length - 1]
								?.username
								? null
								: ', '}
						</Typography>
					))}
			</div>
			<div className='messagesArea'>
				<MessagesArea
					chatMessages={chatMessages}
					chatMessagesLoading={chatMessagesLoading}
					chatMessagesError={chatMessagesError}
				/>
			</div>
			<MessageInput />
		</StyledChatBox>
	);
};

export default ChatBox;
