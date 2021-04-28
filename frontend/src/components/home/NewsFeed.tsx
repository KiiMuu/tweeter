import { Fragment } from 'react';
import { PageTitle } from '../../styles/headings';
import CreateTweet from './CreateTweet';
import Tweets from './Tweets';

const NewsFeed: React.FC = () => {
    return (
        <Fragment>
            <PageTitle>Home</PageTitle>
            <CreateTweet />
            <Tweets />
        </Fragment>
    )
}

export default NewsFeed;