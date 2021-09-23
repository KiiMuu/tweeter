import { IChat, IMessage } from '../../typings';
import MessageInput from './MessageInput';
import MessagesArea from './MessagesArea';
import { StyledChatBox } from '../../styles/messages';
import { Typography } from '@material-ui/core';
import useUserInfo from '../../hooks/useUserInfo';
import { getChatName, listChatUsers } from '../../util';

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
	const { currentUser } = useUserInfo();

	return (
		<StyledChatBox>
			<div className='heading'>
				<Typography variant='h5'>
					{getChatName(singleChat, currentUser)}
				</Typography>
				<Typography variant='caption'>
					{listChatUsers(singleChat)}
				</Typography>
			</div>
			<div className='messagesArea'>
				<MessagesArea
					chatMessages={chatMessages}
					chatMessagesLoading={chatMessagesLoading}
					chatMessagesError={chatMessagesError}
				/>
			</div>
			<MessageInput singleChat={singleChat} />
		</StyledChatBox>
	);
};

export default ChatBox;
