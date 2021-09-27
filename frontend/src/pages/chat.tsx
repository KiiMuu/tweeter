import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HomeLayout from '../components/home/HomeLayout';
import ChatBox from '../components/messages/ChatBox';
import ChatContext from '../context/contexts/chat';
import { AlertStyles } from '../styles/notifiers';
import { Alert } from '@material-ui/lab';
import { Spin } from '../styles/spinners';
import { IMessage } from '../typings';
import useSocket from '../hooks/useSocket';

const ChatPage: React.FC = () => {
	const {
		singleChatLoading,
		singleChatError,
		singleChat,
		chatMessagesLoading,
		chatMessagesError,
		chatMessages,
		getChat,
		getChatMessages,
		onMessageRecieved,
	} = useContext(ChatContext);
	const { id } = useParams<any>();

	useEffect(() => {
		getChat(id);
		getChatMessages(id);
		// eslint-disable-next-line
	}, [id]);

	useSocket('new message', (message: IMessage) => {
		onMessageRecieved(message);
	});

	if (singleChatLoading)
		return (
			<span
				style={{
					display: 'flex',
					justifyContent: 'center',
					marginTop: '30px',
					overflow: 'hidden',
				}}
			>
				<Spin></Spin>
			</span>
		);

	if (singleChatError)
		return (
			<AlertStyles style={{ marginTop: '20px' }}>
				<Alert severity='error' icon={false}>
					{singleChatError}
				</Alert>
			</AlertStyles>
		);

	return (
		<HomeLayout isExtraContent={false}>
			<ChatBox
				singleChat={singleChat}
				chatMessages={chatMessages}
				chatMessagesLoading={chatMessagesLoading}
				chatMessagesError={chatMessagesError}
			/>
		</HomeLayout>
	);
};

export default ChatPage;
