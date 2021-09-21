import Message from './Message';
import { IMessage } from '../../typings';
import { AlertStyles } from '../../styles/notifiers';
import { Spin } from '../../styles/spinners';
import { Alert } from '@material-ui/lab';

interface Props {
	chatMessages: IMessage[];
	chatMessagesLoading: boolean;
	chatMessagesError: string | null;
}

const MessagesArea: React.FC<Props> = ({
	chatMessages,
	chatMessagesLoading,
	chatMessagesError,
}) => {
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
	if (chatMessages?.length === 0) return <div>No messages here!</div>;

	return (
		<>
			{chatMessages?.map((message: IMessage) => (
				<Message key={message._id} message={message} />
			))}
		</>
	);
};

export default MessagesArea;
