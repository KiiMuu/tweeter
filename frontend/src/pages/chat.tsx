import { Alert } from '@material-ui/lab';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HomeLayout from '../components/home/HomeLayout';
import ChatBox from '../components/messages/ChatBox';
import ChatContext from '../context/contexts/chat';
import { AlertStyles } from '../styles/notifiers';
import { Spin } from '../styles/spinners';

const ChatPage: React.FC = () => {
	const {
		getChat,
		singleChatLoading,
		singleChatError,
		singleChat,
		getChatMessages,
		chatMessages,
		chatMessagesLoading,
		chatMessagesError,
	} = useContext(ChatContext);
	const { id } = useParams<any>();

	useEffect(() => {
		getChat(id);
		getChatMessages(id);
		// eslint-disable-next-line
	}, [id]);

	return (
		<HomeLayout isExtraContent={false}>
			{singleChatLoading ? (
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
			) : singleChatError ? (
				<AlertStyles style={{ marginTop: '20px' }}>
					<Alert severity='error' icon={false}>
						{singleChatError}
					</Alert>
				</AlertStyles>
			) : (
				<ChatBox
					singleChat={singleChat}
					chatMessages={chatMessages}
					chatMessagesLoading={chatMessagesLoading}
					chatMessagesError={chatMessagesError}
				/>
			)}
		</HomeLayout>
	);
};

export default ChatPage;
