import { Fragment, useContext, useEffect } from 'react';
import TweetaContext from '../../context/contexts/tweetaContext';
import SingleTweet from './SingleTweet';
import { TweetaType } from '../../typings';

import { AlertStyles } from '../../styles/notifiers';

import { Alert } from '@material-ui/lab';

const Tweets: React.FC = () => {
    const {
        tweetsLoading,
        tweetsError,
        getTweets,
        tweets,
    } = useContext(TweetaContext);

    useEffect(() => {
        getTweets();
        // eslint-disable-next-line
    }, []);

    const showTweets = () => (
        tweets?.map((tweeta: TweetaType) => (
            <SingleTweet tweeta={tweeta} key={tweeta._id} />
        ))
    )

    return (
        <Fragment>
            {tweetsLoading ? (
                <p>Loading...</p>
            ) : tweetsError ? (
                <p>{`ERROR: ${tweetsError}`}</p>
            ) : !tweets?.length ? (
                <AlertStyles>
                    <Alert 
                        severity='info'
                        icon={false}
                    >
                        No Tweets in your news feed yet!.
                    </Alert>
                </AlertStyles>
            ) : (
                showTweets()
            )}
        </Fragment>
    )
}

export default Tweets;