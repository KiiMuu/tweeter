import { TweetaProps } from '../../typings';

interface Props {
	tweets: TweetaProps[];
}

const Tweets: React.FC<Props> = ({ tweets }) => {
	return <div>Tweets - {tweets?.length}</div>;
};

export default Tweets;
