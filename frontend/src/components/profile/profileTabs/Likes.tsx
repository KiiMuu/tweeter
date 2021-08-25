import { TweetaProps, TweetaType } from '../../../typings';
import Tweeta from '../../home/Tweeta';
import { TweetaList } from '../../../styles/home';
import { Spin } from '../../../styles/spinners';

const Likes: React.FC<TweetaProps> = ({ likes, loading, error }) => {
	const showLikes = () => (
		<TweetaList>
			{likes?.map((tweeta: TweetaType) => (
				<Tweeta tweeta={tweeta} key={tweeta._id} />
			))}
		</TweetaList>
	);

	console.log({ likes });

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
	) : !likes?.length ? (
		<p>No likes</p>
	) : (
		showLikes()
	);
};

export default Likes;
