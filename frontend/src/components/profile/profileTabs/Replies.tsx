import { useParams } from 'react-router-dom';
import { TweetaProps, TweetaType, UserInfoProps } from '../../../typings';
import Tweeta from '../../home/Tweeta';
import { TweetaList } from '../../../styles/home';
import { Spin } from '../../../styles/spinners';
import { Alert } from '@material-ui/lab';
import { AlertStyles } from '../../../styles/notifiers';

const Replies: React.FC<TweetaProps> = ({ replies, loading, error }) => {
	const { username } = useParams<UserInfoProps['username']>();

	const showReplies = () => (
		<TweetaList>
			{replies?.map((tweeta: TweetaType) => (
				<Tweeta tweeta={tweeta} key={tweeta._id} />
			))}
		</TweetaList>
	);

	return loading ? (
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
	) : error ? (
		<h4>{error}</h4>
	) : !replies?.length ? (
		<AlertStyles style={{ marginTop: '20px' }}>
			<Alert severity='info' icon={false}>
				Replies by {username} will be listed here.
			</Alert>
		</AlertStyles>
	) : (
		showReplies()
	);
};

export default Replies;
