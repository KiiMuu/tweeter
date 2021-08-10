import { Alert } from '@material-ui/lab';
import { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReplyForm from '../components/forms/ReplyForm';
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
				{getSingleTweetaLoading ? (
					<Spin></Spin>
				) : (
					`Tweeted by @${singleTweeta?.tweeta?.postedBy?.username}`
				)}
			</PageTitle>
			<TweetaPage>
				{getSingleTweetaLoading ? (
					<div className='mainTweetaLoading'>
						<Spin></Spin>
					</div>
				) : getSingleTweetaError ? (
					<AlertStyles>
						<Alert severity='error' icon={false}>
							{getSingleTweetaError}
						</Alert>
					</AlertStyles>
				) : (
					<Fragment>
						<div className='mainTweeta'>
							<Tweeta
								tweeta={singleTweeta?.tweeta}
								replies={singleTweeta?.replies}
								isViewThisTweet={false}
								isLinkContent={false}
								isTweetaPage={true}
							/>
						</div>
						<div className='replies'>
							{singleTweeta.replies?.map((reply: any) => (
								<Tweeta
									key={reply._id}
									tweeta={reply}
									isViewThisTweet={false}
									isLinkContent={false}
									isTweetaPage={true}
								/>
							))}
						</div>
						<ReplyForm singleTweeta={singleTweeta} />
					</Fragment>
				)}
			</TweetaPage>
		</HomeLayout>
	);
};

export default SingleTweeta;
