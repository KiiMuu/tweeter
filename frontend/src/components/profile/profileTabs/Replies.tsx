import { TweetaProps, TweetaType } from '../../../typings';
import Tweeta from '../../home/Tweeta';
import { TweetaList } from '../../../styles/home';
import { Spin } from '../../../styles/spinners';

const Replies: React.FC<TweetaProps> = ({ replies, loading, error }) => {
	const showReplies = () => (
		<TweetaList>
			{replies?.map((tweeta: TweetaType) => (
				<Tweeta tweeta={tweeta} key={tweeta._id} />
			))}
		</TweetaList>
	);

	console.log({ replies });

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
		<p>No replies</p>
	) : (
		showReplies()
	);
};

export default Replies;
