import { Fragment, useContext, useEffect } from 'react';
import TweetaContext from '../../context/contexts/tweetaContext';
import Tweeta from './Tweeta';
import { TweetaType, TweetsProps } from '../../typings';
import { AlertStyles } from '../../styles/notifiers';

import { Alert } from '@material-ui/lab';
import { TweetaList } from '../../styles/home';
import { Snackbar } from '@material-ui/core';
import useSnackBar from '../../hooks/useSnackBar';
import TweetaSkeleton from '../skeletons/TweetaSkeleton';

const Tweets: React.FC<TweetsProps> = ({ tweets }) => {
    const { open, setOpen, handleClose } = useSnackBar();

    const {
        tweetsLoading,
        tweetsError,
        removeTweetaSuccess,
        removeTweetaError,
    } = useContext(TweetaContext);

    const showTweets = () => (
        <TweetaList>
            {tweets?.map((tweeta: TweetaType) => (
                <Tweeta tweeta={tweeta} key={tweeta._id} />
            ))}
        </TweetaList>
    )

    useEffect(() => {
        if (removeTweetaSuccess) {
            setOpen(true);
        }

        if (removeTweetaError) {
            setOpen(true);
        }
    }, [removeTweetaSuccess, removeTweetaError, setOpen]);

    return (
        <Fragment>
            <Snackbar 
                open={open}
                onClose={handleClose}
                autoHideDuration={3000}
                message={removeTweetaSuccess ? 'Tweet removed' : removeTweetaError}
            />
            {tweetsLoading ? (
                <TweetaSkeleton />
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