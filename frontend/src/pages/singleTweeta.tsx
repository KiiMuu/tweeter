import { Alert } from '@material-ui/lab';
import { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HomeLayout from '../components/home/HomeLayout';
import Tweeta from '../components/home/Tweeta';
import TweetaContext from '../context/contexts/tweetaContext';
import { PageTitle } from '../styles/headings';
import { AlertStyles } from '../styles/notifiers';
import { Spin } from '../styles/spinners';
import { TweetaPage } from '../styles/tweeta';

const SingleTweeta: React.FC = () => {
    // @ts-ignore
    const { id } = useParams<string>();

    const {
        getSingleTweeta,
        getSingleTweetaError,
        getSingleTweetaLoading,
        singleTweeta,
    } = useContext(TweetaContext);

    useEffect(() => {
        getSingleTweeta(id);
        // eslint-disable-next-line
    }, [id]);

    return (
        <HomeLayout>
            <PageTitle>
                {getSingleTweetaLoading ? <Spin></Spin> : (
                    `Tweeted by @${singleTweeta?.postedBy?.username}`
                )}
            </PageTitle>
            <TweetaPage>
                {getSingleTweetaLoading ? (
                    <div className='mainTweetaLoading'>
                        <Spin></Spin>
                    </div>
                ) : getSingleTweetaError ? (
                    <AlertStyles>
                        <Alert 
                            severity='error'
                            icon={false}
                        >{getSingleTweetaError}</Alert>
                    </AlertStyles>
                ) : (
                    <Fragment>
                        <div className='mainTweeta'>
                            <Tweeta 
                                tweeta={singleTweeta} 
                                isViewThisTweet={false} 
                                isLinkContent={false}
                                isTweetaPage={true}
                            />
                        </div>
                        <div>some replies</div>
                    </Fragment>
                )}
            </TweetaPage>
        </HomeLayout>
    )
}

export default SingleTweeta;