import { useContext, useEffect, useState } from 'react';
import ChatContext from '../../context/contexts/chat';
import Chat from './Chat';
import { AlertStyles } from '../../styles/notifiers';
import { Spin } from '../../styles/spinners';
import { IChat } from '../../typings';
import { Alert } from '@material-ui/lab';
import { List, FormControlLabel, Checkbox } from '@material-ui/core';

const Chats = () => {
	const [unreadOnly, setUnreadOnly] = useState<boolean>(false);
	const {
		userChatListLoading,
		userChatListError,
		userChats,
		getUserChats,
		markChatMessagesAsRead,
	} = useContext(ChatContext);

	useEffect(() => {
		getUserChats(unreadOnly);
		// eslint-disable-next-line
	}, [unreadOnly]);

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
			<div style={{ padding: '0 20px' }}>
				<FormControlLabel
					control={
						<Checkbox
							checked={unreadOnly}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) => setUnreadOnly(e.target.checked)}
						/>
					}
					label='Unread messages only'
				/>
			</div>
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
