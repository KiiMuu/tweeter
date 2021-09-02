import { TweetaProps } from '../../typings';
import Tweeta from '../home/Tweeta';
import { TweetaList } from '../../styles/home';
import { AlertStyles } from '../../styles/notifiers';
import { Alert } from '@material-ui/lab';

interface Props {
	searchTerm: string;
	tweets: TweetaProps[];
}

const Tweets: React.FC<Props> = ({ searchTerm, tweets }) => {
	return !tweets?.length ? (
		<AlertStyles style={{ marginTop: '20px' }}>
			<Alert severity='info' icon={false}>
				No tweets matched "`{searchTerm}`"
			</Alert>
		</AlertStyles>
	) : (
		<TweetaList>
			{tweets?.map((tweeta: TweetaProps) => (
				<Tweeta tweeta={tweeta} key={tweeta._id} />
			))}
		</TweetaList>
	);
};

export default Tweets;
