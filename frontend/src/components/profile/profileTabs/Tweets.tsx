import { TweetaProps, TweetaType } from '../../../typings';
import Tweeta from '../../home/Tweeta';
import { TweetaList } from '../../../styles/home';
import { Spin } from '../../../styles/spinners';

const Tweets: React.FC<TweetaProps> = ({ tweets, loading, error }) => {
	const showTweets = () => (
		<TweetaList>
			{tweets?.map((tweeta: TweetaType) => (
				<Tweeta tweeta={tweeta} key={tweeta._id} />
			))}
		</TweetaList>
	);

	console.log({ tweets });

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
		<p>No tweets</p>
	) : (
		showTweets()
	);
};

export default Tweets;
