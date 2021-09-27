import { useEffect, useRef } from 'react';
import Message from './Message';
import { IMessage } from '../../typings';
import { AlertStyles } from '../../styles/notifiers';
import { Spin } from '../../styles/spinners';
import { Alert } from '@material-ui/lab';

interface Props {
	chatMessages: IMessage[];
	chatMessagesLoading: boolean;
	showTypingDots: boolean;
	chatMessagesError: string | null;
}

const MessagesArea: React.FC<Props> = ({
	chatMessages,
	chatMessagesLoading,
	showTypingDots,
	chatMessagesError,
}) => {
	const bottomRef = useRef<null | HTMLDivElement>(null);

	const scrollToBottom = () => {
		bottomRef?.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	useEffect(() => {
		scrollToBottom();
	}, [chatMessages, showTypingDots]);

	if (chatMessagesLoading)
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
	if (chatMessagesError)
		return (
			<AlertStyles style={{ marginTop: '20px' }}>
				<Alert severity='error' icon={false}>
					{chatMessagesError}
				</Alert>
			</AlertStyles>
		);
	if (chatMessages?.length === 0)
		return (
			<AlertStyles style={{ marginTop: '20px' }}>
				<Alert severity='info' icon={false}>
					No messages
				</Alert>
			</AlertStyles>
		);

	return (
		<div className='messages'>
			{chatMessages?.map((message: IMessage) => (
				<Message key={message._id} message={message} />
			))}
			<div ref={bottomRef}></div>
		</div>
	);
};

export default MessagesArea;
