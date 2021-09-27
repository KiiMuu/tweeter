import { useCallback, memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import useUserInfo from '../../hooks/useUserInfo';
import { getChatName } from '../../util';
import { IChat, UserInfoProps } from '../../typings';
import { StyledAvatarGroup } from '../../styles/messages';
import {
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	ListItemSecondaryAction,
	Badge,
} from '@material-ui/core';
import SocketContext from '../../context/contexts/socket';

interface Props {
	chat: IChat;
	markChatMessagesAsRead: (chatId: string) => { ok: string } | object;
}

const Chat: React.FC<Props> = ({ chat, markChatMessagesAsRead }) => {
	const { currentUser } = useUserInfo();
	const { socket } = useContext(SocketContext);
	const handleChatRead = useCallback(() => {
		markChatMessagesAsRead(chat?._id);
		socket?.emit('join room', chat?._id);
	}, [socket, markChatMessagesAsRead, chat?._id]);

	return (
		<ListItem
			button
			component={Link}
			to={`/messages/${chat?._id}/chat`}
			onClick={() => handleChatRead()}
			style={{
				backgroundColor: chat?.latestMessage?.readBy?.includes(
					currentUser?.user?._id
				)
					? ''
					: 'rgba(29, 161, 242, .15)',
			}}
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
						src={chat?.users[1]?.profilePic}
					/>
				</ListItemAvatar>
			)}
			<ListItemText
				primary={getChatName(chat, currentUser)}
				secondary={
					chat?.isGroupChat
						? `${chat?.latestMessage?.sender?.username}: ${chat?.latestMessage?.content}`
						: chat?.latestMessage?.content
				}
			/>
			{!chat?.latestMessage?.readBy?.includes(currentUser?.user?._id) ? (
				<ListItemSecondaryAction>
					<Badge color='secondary' variant='dot'></Badge>
				</ListItemSecondaryAction>
			) : null}
		</ListItem>
	);
};

export default memo(Chat);
