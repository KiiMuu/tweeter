import { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import TweetaContext from '../../context/contexts/tweetaContext';
import { TweetaProps } from '../../typings';
import { SingleTweeta } from '../../styles/home';
import getTimeDifference from '../../helpers/geTimeDifference';
import useUserInfo from '../../hooks/useUserInfo';
import useSnackBar from '../../hooks/useSnackBar';

import { Button, Menu, MenuItem, Snackbar } from '@material-ui/core';
import { 
    AiOutlineRetweet, 
    AiOutlineHeart, 
    AiOutlineComment,
    AiOutlineMore,
    AiOutlineEye,
    AiOutlineCopy,
    AiOutlineUserDelete,
    AiOutlineDelete,
    AiFillHeart,
} from 'react-icons/ai';
import { Spin } from '../../styles/spinners';

const Tweeta: React.FC<TweetaProps> = ({ 
    tweeta, 
    isViewThisTweet = true, 
    isLinkContent = true,
    isTweetaPage = false,
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const { 
        tweetaLike, 
        deleteTweeta,
        removeTweetaSuccess,
        removeTweetaError,
        removeTweetaLoading,
    } = useContext(TweetaContext);
    const { user } = useUserInfo();
    const { open, setOpen, handleClose } = useSnackBar();
    const location = useLocation();
    const history = useHistory();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const handleTweetaLike = (id: string) => {
        tweetaLike(id);
    }

    const handleTweetaCopy = () => {
        navigator.clipboard.writeText(tweeta?.content).then(() => {
            setOpen(true);
            handleMenuClose();
        }).catch(err => console.error(err));
    }

    const handleTweetaRemove = (id: string) => {
        deleteTweeta(id);
    }

    useEffect(() => {
        if (removeTweetaSuccess) {
            setOpen(true);
            handleMenuClose();
        }

        if (removeTweetaError) {
            setOpen(true);
            handleMenuClose();
        }
    }, [removeTweetaSuccess, removeTweetaError, setOpen]);

    useEffect(() => {
        if (location.pathname === `/tweeta/${tweeta?._id}` && isTweetaPage && removeTweetaSuccess) {
            history.push('/');
        }
    }, [location, history, removeTweetaSuccess, tweeta, isTweetaPage]);

    return (
        <SingleTweeta>
            <Snackbar 
                open={open}
                onClose={handleClose}
                autoHideDuration={(removeTweetaSuccess || removeTweetaError) ? 3000 : 2000}
                message={removeTweetaSuccess ? (
                    'Tweeta has been removed'
                ) : removeTweetaError ? (
                    removeTweetaError
                ) : 'Copied'}
            />
            <div className='userPhoto'>
                <Link to='/profile'>
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
                            <Link to='/profile'>
                                {tweeta?.postedBy?.name}
                            </Link>
                        </h4>
                        <span>
                            <Link to='/profile'>
                                {`@${tweeta?.postedBy?.username}`}
                            </Link>
                        </span>
                        <span>
                            {getTimeDifference(new Date(), new Date(tweeta?.createdAt))}
                        </span>
                    </div>
                    <div className='tweetaOption'>
                        <Button 
                            aria-controls='simple-menu' 
                            aria-haspopup='true'
                            variant='text' 
                            size='small'
                            onClick={handleClick}>
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
                                        <Link to={`/tweeta/${tweeta?._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            View this tweet
                                        </Link>
                                    </MenuItem>
                                )}
                                <MenuItem onClick={handleTweetaCopy}>
                                    <AiOutlineCopy style={{ marginRight: '10px' }} />
                                    <span>{`Copy @${tweeta?.postedBy?.username}'s tweet`}</span>
                                </MenuItem>
                                <MenuItem onClick={handleMenuClose}>
                                    <AiOutlineUserDelete style={{ marginRight: '10px' }} />
                                    <span>Unfollow @{tweeta?.postedBy?.username}</span>
                                </MenuItem>
                                {tweeta?.postedBy?._id === user?.user._id && (
                                    <MenuItem onClick={() => handleTweetaRemove(tweeta?._id)}>
                                        <AiOutlineDelete style={{ marginRight: '10px' }} />
                                        <span>
                                            {removeTweetaLoading ? (
                                                <Spin></Spin>
                                            ) : 'Delete this tweet'}
                                        </span>
                                    </MenuItem>
                                )}
                            </Menu>
                        </div>
                    </div>
                </div>
                {isLinkContent ? (
                    <Link to={`/tweeta/${tweeta?._id}`}>
                        <div className='tweetaContent'>
                            <span>
                                {tweeta?.content}
                            </span>
                        </div>
                    </Link>
                ) : (
                    <div className='tweetaContent'>
                        <span>
                            {tweeta?.content}
                        </span>
                    </div>
                )}
                <div className='tweetaFooter'>
                    <Button variant='text' size='small'>
                        <AiOutlineComment />
                        <span>0</span>
                    </Button>
                    <Button variant='text' size='small'>
                        <AiOutlineRetweet />
                        <span>0</span>
                    </Button>
                    <Button
                        onClick={() => handleTweetaLike(tweeta?._id)} 
                        variant='text' 
                        size='small'>
                        {tweeta?.likes?.includes(user?.user._id) ? <AiFillHeart className='loved' /> : <AiOutlineHeart />}
                        <span>{tweeta?.likes?.length || ''}</span>
                    </Button>
                </div>
            </div>
        </SingleTweeta>
    )
}

export default Tweeta;