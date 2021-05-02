import { useContext, useEffect, useState } from 'react';
import { PageTitle } from '../../styles/headings';
import TweetaContext from '../../context/contexts/tweetaContext';
import CreateTweet from './CreateTweet';
import Tweets from './Tweets';
import { NewsFeedContainer } from '../../styles/home';

const NewsFeed: React.FC = () => {
    const [tweets, setTweets] = useState<object[]>([]);   

    const {
        createTweeta,
        getTweets,
    } = useContext(TweetaContext);

    const fetchTweets = () => {
        getTweets().then((data: object[]) => {
            setTweets(data);
        }).catch((err: Error) => {
            console.log(err);
        });
    }

    useEffect(() => {
        fetchTweets();
        // eslint-disable-next-line
    }, []);

    return (
        <NewsFeedContainer>
            <PageTitle>Home</PageTitle>
            <CreateTweet 
                createTweeta={createTweeta} 
                fetchTweets={fetchTweets}
            />
            <Tweets tweets={tweets} />
        </NewsFeedContainer>
    )
}

export default NewsFeed;