import { IChat, UserInfoProps } from '../typings';

export const getChatName = (chat: IChat, currentUser: UserInfoProps) => {
	let chatName = chat?.chatName;

	if (!chatName) {
		let otherChatUsers = getOtherChatUsers(chat?.users, currentUser);

		let namesArray = otherChatUsers?.map(
			(user: UserInfoProps) =>
				`${chat?.isGroupChat ? '@' : ''}${user.name}`
		);

		chatName = namesArray?.join(', ');
	}

	return chatName;
};

export const listChatUsers = (chat: IChat) => {
	let namesArray = chat?.users?.map((user: UserInfoProps) => `@${user.name}`);

	return namesArray?.join(', ');
};

const getOtherChatUsers = (
	users: UserInfoProps[],
	currentUser: UserInfoProps
) => {
	if (users?.length === 1) return users;

	return users?.filter(
		(user: UserInfoProps) => user?._id !== currentUser?.user?._id
	);
};
