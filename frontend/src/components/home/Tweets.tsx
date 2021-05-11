import { Fragment, useContext } from 'react';
import TweetaContext from '../../context/contexts/tweetaContext';
import Tweeta from './Tweeta';
import { TweetaType, TweetsProps } from '../../typings';

import { AlertStyles } from '../../styles/notifiers';

import { Alert } from '@material-ui/lab';
import { TweetaList } from '../../styles/home';

const Tweets: React.FC<TweetsProps> = ({ tweets }) => {
    const {
        tweetsLoading,
        tweetsError,
    } = useContext(TweetaContext);

    const showTweets = () => (
        <TweetaList>
            {tweets?.map((tweeta: TweetaType) => (
                <Tweeta tweeta={tweeta} key={tweeta._id} />
            ))}
        </TweetaList>
    )

    return (
        <Fragment>
            {tweetsLoading ? (
                <p>Loading...</p>
            ) : tweetsError ? (
                <AlertStyles>
                    <Alert 
                        severity='error'
                        icon={false}
                    >
                        {tweetsError}
                    </Alert>
                </AlertStyles>
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