import { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import TweetaContext from '../../context/contexts/tweeta';
import UserContext from '../../context/contexts/user';
import { TweetaProps } from '../../typings';
import { SingleTweeta } from '../../styles/home';
import getTimeDifference from '../../helpers/geTimeDifference';
import useUserInfo from '../../hooks/useUserInfo';
import useSnackBar from '../../hooks/useSnackBar';
import ReplyDialog from './tweeta/ReplyDialog';
import MoreOptions from './tweeta/MoreOptions';
import {
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	Snackbar,
} from '@material-ui/core';
import {
	AiOutlineRetweet,
	AiOutlineHeart,
	AiOutlineComment,
	AiFillHeart,
	AiOutlinePushpin,
} from 'react-icons/ai';
import SocketContext from '../../context/contexts/socket';

interface Image {
	public_id: string;
	url: string;
}

const Tweeta: React.FC<TweetaProps> = ({
	tweeta,
	replies,
	isViewThisTweet = true,
	isLinkContent = true,
	isTweetaPage = false,
}) => {
	const [content, setContent] = useState<string>('');
	const [images] = useState<Image[]>([]);
	const [isPin] = useState<boolean>(tweeta?.isPinned);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [selectedImg, setSelectedImg] = useState<null | string>(null);
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);

	const {
		tweetaLike,
		deleteTweeta,
		removeTweetaSuccess,
		removeTweetaLoading,
		tweetaRetweet,
		createTweeta,
		tweetaCreateSuccess,
		tweetaCreateLoading,
		removeTweetaError,
	} = useContext(TweetaContext);
	const { follow, handleTweetaPin, pinTweetaLoading } =
		useContext(UserContext);
	const { currentUser } = useUserInfo();
	const { socket } = useContext(SocketContext);
	const { open, setOpen, handleClose } = useSnackBar();
	const location = useLocation();
	const history = useHistory();

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			setAnchorEl(e.currentTarget);
		},
		[]
	);

	const handleMenuClose = useCallback(() => {
		setAnchorEl(null);
	}, []);

	const handleTweetaLike = (id: string) => {
		tweetaLike(id);

		!tweeta?.likes?.includes(currentUser?.user._id) &&
			socket?.emit('notification received', tweeta?.postedBy?._id);
	};

	const handleTweetaRetweet = (id: string) => {
		tweetaRetweet(id);

		!tweeta?.retweeters?.includes(currentUser?.user._id) &&
			socket?.emit('notification received', tweeta?.postedBy?._id);
	};

	const handleTweetaCopy = () => {
		navigator.clipboard
			.writeText(tweeta?.content)
			.then(() => {
				setOpen(true);
				handleMenuClose();
			})
			.catch(err => console.error(err));
	};

	const handleTweetaRemove = (id: string) => {
		deleteTweeta(id);
	};

	const handleClickOpen = (id: string) => {
		setSelectedImg(id);
	};

	const handleModalClose = () => {
		setSelectedImg(null);
	};

	useEffect(() => {
		if (removeTweetaSuccess) {
			handleMenuClose();
		}

		if (tweetaCreateSuccess) {
			setDialogOpen(false);
		}

		if (removeTweetaError) {
			handleMenuClose();
		}
	}, [
		removeTweetaSuccess,
		tweetaCreateSuccess,
		removeTweetaError,
		handleMenuClose,
	]);

	useEffect(() => {
		if (
			location.pathname === `/tweeta/${tweeta?._id}` &&
			isTweetaPage &&
			removeTweetaSuccess
		) {
			history.push('/');
		}
	}, [location, history, removeTweetaSuccess, tweeta, isTweetaPage]);

	let isRetweeted = tweeta?.retweetData !== undefined;
	let retweetedBy = isRetweeted ? tweeta?.postedBy?.username : '';
	tweeta = isRetweeted ? tweeta.retweetData : tweeta;
	let isReply = tweeta?.replyTo !== undefined;
	let repliedBy = isReply ? tweeta?.replyTo?.postedBy?.username : '';

	return (
		<SingleTweeta>
			<Snackbar
				open={open}
				onClose={handleClose}
				autoHideDuration={3000}
				message='Copied'
			/>
			<div className='headerText'>
				{tweeta?.isPinned ? (
					<Fragment>
						<span>
							<AiOutlinePushpin />
						</span>
						pinned
					</Fragment>
				) : null}
			</div>
			<div className='headerText'>
				{isRetweeted ? (
					<Fragment>
						<span>
							<AiOutlineRetweet />{' '}
						</span>
						<Link to={`/profile/${retweetedBy}`}>
							{retweetedBy}
						</Link>{' '}
						retweeted
					</Fragment>
				) : null}
			</div>
			<div className='headerText'>
				{isReply && !isTweetaPage ? (
					<Fragment>
						<span>
							<AiOutlineComment />{' '}
						</span>
						<Link to={`/profile/${repliedBy}`}>{repliedBy}</Link>{' '}
						tweeted this reply
					</Fragment>
				) : null}
			</div>
			<div className='container'>
				<div className='userPhoto'>
					<Link to={`/profile/${tweeta?.postedBy?.username}`}>
						<img
							src={tweeta?.postedBy?.profilePic}
							alt={tweeta?.postedBy?.username}
							width={50}
							height={50}
						/>
					</Link>
				</div>
				<div className='tweetaWrapper'>
					<div className='tweetaHeader'>
						<div className='userInfo'>
							<h4>
								<Link
									to={`/profile/${tweeta?.postedBy?.username}`}
								>
									{tweeta?.postedBy?.name}
								</Link>
							</h4>
							<span>
								<Link
									to={`/profile/${tweeta?.postedBy?.username}`}
								>
									{`@${tweeta?.postedBy?.username}`}
								</Link>
							</span>
							<span>
								{getTimeDifference(
									new Date(),
									new Date(tweeta?.createdAt)
								)}
							</span>
						</div>
						<MoreOptions
							handleClick={handleClick}
							handleMenuClose={handleMenuClose}
							anchorEl={anchorEl}
							isViewThisTweet={isViewThisTweet}
							tweetaId={tweeta?._id}
							tweetaCreatorId={tweeta?.postedBy?._id}
							currentUserId={currentUser?.user?._id}
							handleTweetaPin={handleTweetaPin}
							pinTweetaLoading={pinTweetaLoading}
							isPin={isPin}
							isPinned={tweeta?.isPinned}
							follow={follow}
							handleTweetaCopy={handleTweetaCopy}
							tweetaUsername={tweeta?.postedBy?.username}
							handleTweetaRemove={handleTweetaRemove}
							removeTweetaLoading={removeTweetaLoading}
							currentUserFollowing={currentUser?.user?.following}
						/>
					</div>
					<div className='tweetaContent'>
						{isLinkContent ? (
							<Link
								to={`/tweeta/${
									isReply ? tweeta?.replyTo?._id : tweeta?._id
								}`}
							>
								<span>{tweeta?.content}</span>
							</Link>
						) : (
							<span>{tweeta?.content}</span>
						)}
						<div className='tweetaImgs'>
							{tweeta?.images?.map((img: Image) => (
								<div className='modalImg' key={img.public_id}>
									<img
										key={img.public_id}
										src={img.url}
										alt={img.public_id}
										onClick={() =>
											handleClickOpen(img.public_id)
										}
									/>
									{selectedImg === img.public_id && (
										<Dialog
											open={selectedImg !== null}
											onClose={handleModalClose}
										>
											<img
												src={img.url}
												alt={img.public_id}
											/>
											<DialogContent>
												<DialogContentText
													style={{
														marginBottom: '0',
													}}
												>
													{tweeta?.content}
												</DialogContentText>
											</DialogContent>
										</Dialog>
									)}
								</div>
							))}
						</div>
					</div>
					<div className='tweetaFooter'>
						<Button
							variant='text'
							size='small'
							onClick={() => setDialogOpen(true)}
						>
							<AiOutlineComment />
							<span className='count'>
								{replies?.length || ''}
							</span>
						</Button>
						<ReplyDialog
							dialogOpen={dialogOpen}
							setDialogOpen={setDialogOpen}
							content={content}
							setContent={setContent}
							createTweeta={createTweeta}
							tweetaId={tweeta?._id}
							tweetaCreateLoading={tweetaCreateLoading}
							images={images}
							postedById={tweeta?.postedBy?._id}
							currentUserId={currentUser?.user?._id}
						/>
						<Button
							onClick={() => handleTweetaRetweet(tweeta?._id)}
							variant='text'
							size='small'
						>
							<AiOutlineRetweet
								className={
									tweeta?.retweeters?.includes(
										currentUser?.user._id
									)
										? 'retweeted'
										: ''
								}
							/>
							<span className='count'>
								{tweeta?.retweeters?.length || ''}
							</span>
						</Button>
						<Button
							onClick={() => handleTweetaLike(tweeta?._id)}
							variant='text'
							size='small'
						>
							{tweeta?.likes?.includes(currentUser?.user._id) ? (
								<AiFillHeart className='loved' />
							) : (
								<AiOutlineHeart />
							)}
							<span className='count'>
								{tweeta?.likes?.length || ''}
							</span>
						</Button>
					</div>
				</div>
			</div>
		</SingleTweeta>
	);
};

export default Tweeta;
