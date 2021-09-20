import { IChat, IMessage } from '../../typings';

interface Props {
	singleChat: IChat;
	chatMessages: IMessage[];
}

const ChatBox: React.FC<Props> = ({ singleChat, chatMessages }) => {
	return <div>ChatBox</div>;
};

export default ChatBox;
