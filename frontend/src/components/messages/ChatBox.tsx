import { useCallback, useContext, useState } from 'react';
import { IChat, IMessage } from '../../typings';
import MessageInput from './MessageInput';
import MessagesArea from './MessagesArea';
import { StyledChatBox } from '../../styles/messages';
import { Typography } from '@material-ui/core';
import useUserInfo from '../../hooks/useUserInfo';
import { getChatName, listChatUsers } from '../../util';
import MoreOptions from './MoreOptions';
import SocketContext from '../../context/contexts/socket';
import useSocket from '../../hooks/useSocket';
import TypingDots from './TypingDots';

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
	const [isTyping, setIsTyping] = useState<boolean>(false);
	const [showTypingDots, setShowTypingDots] = useState<boolean>(false);
	const { socket } = useContext(SocketContext);
	const { currentUser } = useUserInfo();

	useSocket('join room', singleChat?._id);
	useSocket('typing', () => setShowTypingDots(true));
	useSocket('stop typing', () => setShowTypingDots(false));

	const updateTyping = useCallback(() => {
		if (!isTyping) {
			setIsTyping(true);

			socket?.emit('typing', singleChat?._id);
		}

		let lastTypingTime = new Date().getTime();
		let timerLength = 3000;

		setTimeout(() => {
			let timeNow = new Date().getTime();
			let timeDiff = timeNow - lastTypingTime;

			if (timeDiff >= timerLength && isTyping) {
				socket?.emit('stop typing', singleChat?._id);

				setIsTyping(false);
			}
		}, timerLength);
	}, [isTyping, socket, singleChat?._id]);

	return (
		<StyledChatBox>
			<div className='heading'>
				<div className='name'>
					<Typography variant='h5'>
						{getChatName(singleChat, currentUser)}
					</Typography>
					<Typography variant='caption'>
						{listChatUsers(singleChat)}
					</Typography>
				</div>
				<MoreOptions singleChat={singleChat} />
			</div>
			<div className='messagesArea'>
				<MessagesArea
					chatMessages={chatMessages}
					chatMessagesLoading={chatMessagesLoading}
					chatMessagesError={chatMessagesError}
					showTypingDots={showTypingDots}
				/>
				{showTypingDots ? <TypingDots /> : null}
			</div>
			<MessageInput singleChat={singleChat} updateTyping={updateTyping} />
		</StyledChatBox>
	);
};

export default ChatBox;
