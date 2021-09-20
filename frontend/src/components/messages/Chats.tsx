import { useContext, useEffect } from 'react';
import ChatContext from '../../context/contexts/chat';
import Chat from './Chat';
import { AlertStyles } from '../../styles/notifiers';
import { Spin } from '../../styles/spinners';
import { IChat } from '../../typings';
import { Alert } from '@material-ui/lab';
import { List } from '@material-ui/core';

const Chats = () => {
	const {
		userChatListLoading,
		userChatListError,
		userChats,
		getUserChats,
		markChatMessagesAsRead,
	} = useContext(ChatContext);

	useEffect(() => {
		getUserChats(false);
		// eslint-disable-next-line
	}, []);

	if (userChatListLoading)
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

	if (userChatListError)
		return (
			<AlertStyles style={{ marginTop: '20px' }}>
				<Alert severity='error' icon={false}>
					{userChatListError}
				</Alert>
			</AlertStyles>
		);

	return (
		<List>
			{userChats?.map((chat: IChat) => (
				<Chat
					key={chat._id}
					chat={chat}
					markChatMessagesAsRead={markChatMessagesAsRead}
				/>
			))}
		</List>
	);
};

export default Chats;
