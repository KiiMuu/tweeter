import { useParams } from 'react-router-dom';
import { TweetaProps, TweetaType, UserInfoProps } from '../../../typings';
import Tweeta from '../../home/Tweeta';
import { TweetaList } from '../../../styles/home';
import { Spin } from '../../../styles/spinners';
import { Alert } from '@material-ui/lab';
import { AlertStyles } from '../../../styles/notifiers';

const Likes: React.FC<TweetaProps> = ({ likes, loading, error }) => {
	const { username } = useParams<UserInfoProps['username']>();

	const showLikes = () => (
		<TweetaList>
			{likes?.map((tweeta: TweetaType) => (
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
	) : !likes?.length ? (
		<AlertStyles style={{ marginTop: '20px' }}>
			<Alert severity='info' icon={false}>
				Likes by {username} will be listed here.
			</Alert>
		</AlertStyles>
	) : (
		showLikes()
	);
};

export default Likes;
