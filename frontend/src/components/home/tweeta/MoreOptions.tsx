import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@material-ui/core';
import {
	AiOutlineMore,
	AiOutlineEye,
	AiOutlineCopy,
	AiOutlineUserDelete,
	AiOutlineDelete,
	AiOutlinePushpin,
} from 'react-icons/ai';
import { Spin } from '../../../styles/spinners';

interface ChildProps {
	handleClick: any;
	handleMenuClose: any;
	anchorEl: any;
	isViewThisTweet: boolean;
	tweetaId: string;
	tweetaCreatorId: string;
	currentUserId: string;
	handleTweetaPin: Function;
	isPin: boolean;
	isPinned: boolean;
	pinTweetaLoading: boolean;
	follow: Function;
	handleTweetaCopy: any;
	tweetaUsername: string;
	handleTweetaRemove: Function;
	removeTweetaLoading: boolean | undefined;
	currentUserFollowing: string[];
}

const MoreOptions: React.FC<ChildProps> = ({
	handleClick,
	handleMenuClose,
	anchorEl,
	isViewThisTweet,
	tweetaId,
	tweetaCreatorId,
	currentUserId,
	handleTweetaPin,
	isPin,
	isPinned,
	pinTweetaLoading,
	follow,
	handleTweetaCopy,
	tweetaUsername,
	handleTweetaRemove,
	removeTweetaLoading,
	currentUserFollowing,
}) => {
	const pinTweet = useCallback(() => {
		handleTweetaPin(tweetaId, !isPin);
	}, [handleTweetaPin, tweetaId, isPin]);

	const handleFollow = useCallback(() => {
		follow(tweetaCreatorId);
	}, [follow, tweetaCreatorId]);

	const handleRemove = useCallback(() => {
		handleTweetaRemove(tweetaId);
	}, [handleTweetaRemove, tweetaId]);

	return (
		<div className='tweetaOption'>
			<Button
				aria-controls='simple-menu'
				aria-haspopup='true'
				variant='text'
				size='small'
				onClick={handleClick}
			>
				<AiOutlineMore />
			</Button>
			<div className='optionsMenu'>
				<Menu
					id='simple-menu'
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}
				>
					{isViewThisTweet && (
						<MenuItem onClick={handleMenuClose}>
							<AiOutlineEye style={{ marginRight: '10px' }} />
							<Link
								to={`/tweeta/${tweetaId}`}
								style={{
									textDecoration: 'none',
									color: 'inherit',
								}}
							>
								View this tweet
							</Link>
						</MenuItem>
					)}
					{tweetaCreatorId === currentUserId ? (
						<MenuItem onClick={() => pinTweet()}>
							<AiOutlinePushpin style={{ marginRight: '10px' }} />
							{pinTweetaLoading ? (
								<Spin></Spin>
							) : isPinned ? (
								'Unpin'
							) : (
								'Pin'
							)}
						</MenuItem>
					) : null}
					<MenuItem onClick={handleTweetaCopy}>
						<AiOutlineCopy style={{ marginRight: '10px' }} />
						<span>Copy</span>
					</MenuItem>
					{tweetaCreatorId !== currentUserId ? (
						<MenuItem onClick={() => handleFollow()}>
							<AiOutlineUserDelete
								style={{ marginRight: '10px' }}
							/>
							<span>
								{currentUserFollowing?.includes(tweetaCreatorId)
									? 'Unfollow'
									: 'Follow'}{' '}
								@{tweetaUsername}
							</span>
						</MenuItem>
					) : null}
					{tweetaCreatorId === currentUserId && (
						<MenuItem onClick={() => handleRemove()}>
							<AiOutlineDelete style={{ marginRight: '10px' }} />
							<span>
								{removeTweetaLoading ? <Spin></Spin> : 'Delete'}
							</span>
						</MenuItem>
					)}
				</Menu>
			</div>
		</div>
	);
};

export default MoreOptions;
