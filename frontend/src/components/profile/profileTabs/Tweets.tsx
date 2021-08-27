import { useParams } from 'react-router-dom';
import { TweetaProps, TweetaType, UserInfoProps } from '../../../typings';
import Tweeta from '../../home/Tweeta';
import { TweetaList } from '../../../styles/home';
import { Spin } from '../../../styles/spinners';
import { Alert } from '@material-ui/lab';
import { AlertStyles } from '../../../styles/notifiers';

const Tweets: React.FC<TweetaProps> = ({ tweets, loading, error }) => {
	const { username } = useParams<UserInfoProps['username']>();

	const showTweets = () => (
		<TweetaList>
			{tweets?.map((tweeta: TweetaType) =>
				!tweeta.isPinned ? (
					<Tweeta tweeta={tweeta} key={tweeta._id} />
				) : null
			)}
		</TweetaList>
	);

	const showPinneTweet = () =>
		tweets?.map((tweeta: TweetaType) => {
			return tweeta.isPinned ? (
				<Tweeta tweeta={tweeta} key={tweeta._id} />
			) : null;
		});

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
	) : !tweets?.length ? (
		<AlertStyles style={{ marginTop: '20px' }}>
			<Alert severity='info' icon={false}>
				Tweets by {username} will be listed here.
			</Alert>
		</AlertStyles>
	) : (
		<>
			{showPinneTweet()}
			{showTweets()}
		</>
	);
};

export default Tweets;
