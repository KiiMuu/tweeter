import { UserInfoProps } from '../typings';

const getNotificationText = (from: UserInfoProps, type: string) => {
	if (type === 'like') {
		return `${from.username} liked one of your tweets.`;
	} else if (type === 'follow') {
		return `${from.username} started following you.`;
	} else if (type === 'reply') {
		return `${from.username} replied on one of your tweets.`;
	} else if (type === 'retweet') {
		return `${from.username} retweeted on one of your tweets.`;
	}
};

export default getNotificationText;
