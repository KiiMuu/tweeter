import { Fragment, useContext, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import TweetaContext from '../../context/contexts/tweetaContext';
import { TweetaProps } from '../../typings';
import { SingleTweeta } from '../../styles/home';
import getTimeDifference from '../../helpers/geTimeDifference';
import useUserInfo from '../../hooks/useUserInfo';
import useSnackBar from '../../hooks/useSnackBar';

import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText,
    DialogTitle,
    Menu, 
    MenuItem, 
    Snackbar, 
    TextField
} from '@material-ui/core';
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

interface Image {
    public_id: string,
    url: string,
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
    
    const handleTweetaRetweet = (id: string) => {
        tweetaRetweet(id);
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
    }, [removeTweetaSuccess, tweetaCreateSuccess, removeTweetaError]);

    const replyDialog = () => (
        <Dialog 
            open={dialogOpen} 
            onClose={() => setDialogOpen(false)} 
            aria-labelledby='form-dialog-title'>
            <DialogTitle id='form-dialog-title'>Tweet your quick reply</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='Type your reply'
                    type='text'
                    fullWidth={true}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDialogOpen(false)} color='primary'>
                    Cancel
                </Button>
                <Button 
                    onClick={() => createTweeta({ content, images, replyTo: tweeta?._id })} 
                    color='primary'>
                    {tweetaCreateLoading ? <Spin></Spin> : 'Tweet'}
                </Button>
            </DialogActions>
        </Dialog>
    )

    useEffect(() => {
        if (location.pathname === `/tweeta/${tweeta?._id}` && isTweetaPage && removeTweetaSuccess) {
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
                <div className='retweetText'>
                    {isRetweeted ? (
                        <Fragment>
                            <span><AiOutlineRetweet /> </span>
                            <Link to='/profile'>{retweetedBy}</Link> retweeted
                        </Fragment>
                    ) : ''}
                </div>
                <div className='retweetText'>
                    {isReply && !isTweetaPage ? (
                        <Fragment>
                            <span><AiOutlineComment /> </span>
                            <Link to='/profile'>{repliedBy}</Link> tweeted this reply
                        </Fragment>
                    ) : ''}
                </div>
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
                <div className='tweetaContent'>
                    {isLinkContent ? (
                        <Link to={`/tweeta/${isReply ? tweeta?.replyTo?._id : tweeta?._id}`}>
                            <span>
                                {tweeta?.content}
                            </span>
                        </Link>
                    ) : (
                        <span>
                            {tweeta?.content}
                        </span>
                    )}
                    <div className='tweetaImgs'>
                        {tweeta?.images?.map((img: Image) => (
                            <div className='modalImg' key={img.public_id} >
                                <img 
                                    key={img.public_id} 
                                    src={img.url} 
                                    alt={img.public_id}
                                    onClick={() => handleClickOpen(img.public_id)}
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
                                                style={{ marginBottom: '0' }}>
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
                        onClick={() => setDialogOpen(true)}>
                        <AiOutlineComment />
                        <span>{replies?.length || ''}</span>
                    </Button>
                    {replyDialog()}
                    <Button
                        onClick={() => handleTweetaRetweet(tweeta?._id)} 
                        variant='text' 
                        size='small'>
                        <AiOutlineRetweet 
                            className={tweeta?.retweeters?.includes(user?.user._id) ? 'retweeted' : ''} 
                        />
                        <span>{tweeta?.retweeters?.length || ''}</span>
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