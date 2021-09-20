import { useCallback, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChatContext from '../../context/contexts/chat';
import { IChat, UserInfoProps } from '../../typings';
import { StyledAvatarGroup } from '../../styles/messages';
import {
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	ListItemSecondaryAction,
	Chip,
} from '@material-ui/core';
import useUserInfo from '../../hooks/useUserInfo';

interface Props {
	chat: IChat;
	markChatMessagesAsRead: (chatId: string) => { ok: string } | object;
}

const Chat: React.FC<Props> = ({ chat, markChatMessagesAsRead }) => {
	const { getChatMessages, chatMessages } = useContext(ChatContext);
	const { currentUser } = useUserInfo();

	useEffect(() => {
		getChatMessages(chat?._id);
		// eslint-disable-next-line
	}, []);

	const unreadChatMessages = [];
	chatMessages?.forEach(message => {
		if (!message?.readBy?.includes(currentUser?.user?._id)) {
			unreadChatMessages.push(message);
		}
	});

	const handleChatRead = useCallback(() => {
		markChatMessagesAsRead(chat?._id);
	}, [markChatMessagesAsRead, chat?._id]);

	return (
		<ListItem
			button
			component={Link}
			to={`/messages/${chat?._id}/chat`}
			onClick={() => handleChatRead()}
		>
			{chat?.isGroupChat ? (
				<StyledAvatarGroup>
					{chat?.users?.slice(0, 3).map((user: UserInfoProps) => (
						<Avatar
							key={user?._id}
							alt={chat?.chatName}
							src={user?.profilePic}
						/>
					))}
				</StyledAvatarGroup>
			) : (
				<ListItemAvatar>
					<Avatar
						alt={chat?.chatName}
						src={chat?.latestMessage?.sender?.profilePic}
					/>
				</ListItemAvatar>
			)}
			<ListItemText
				primary={
					chat?.isGroupChat
						? chat?.chatName || 'No Name'
						: chat?.latestMessage?.sender?.name
				}
				secondary={chat?.latestMessage?.content}
			/>
			{unreadChatMessages.length > 0 && (
				<ListItemSecondaryAction>
					<Chip
						label={unreadChatMessages?.length}
						color='primary'
						size='small'
						style={{ color: '#fff' }}
					/>
				</ListItemSecondaryAction>
			)}
		</ListItem>
	);
};

export default Chat;
