import { PageTitle } from '../../styles/headings';
import CreateTweet from './CreateTweet';
import Tweets from './Tweets';
import { NewsFeedContainer } from '../../styles/home';

const NewsFeed: React.FC = () => {
    return (
        <NewsFeedContainer>
            <PageTitle>Home</PageTitle>
            <CreateTweet />
            <Tweets />
        </NewsFeedContainer>
    )
}

export default NewsFeed;