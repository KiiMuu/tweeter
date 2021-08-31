import { useContext, useEffect } from 'react';
import { PageTitle } from '../../styles/headings';
import TweetaContext from '../../context/contexts/tweeta';
import CreateTweet from './CreateTweet';
import Tweets from './Tweets';
import { NewsFeedContainer } from '../../styles/home';

const NewsFeed: React.FC = () => {
	const { createTweeta, getTweets, tweets } = useContext(TweetaContext);

	useEffect(() => {
		getTweets();
		// eslint-disable-next-line
	}, []);

	return (
		<NewsFeedContainer>
			<PageTitle>Home</PageTitle>
			<CreateTweet createTweeta={createTweeta} />
			<Tweets tweets={tweets} />
		</NewsFeedContainer>
	);
};

export default NewsFeed;
