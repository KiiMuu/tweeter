import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/contexts/authContext';

import { TweetForm } from '../../styles/home';

import { Button, Divider } from '@material-ui/core';
import { FaSmile } from 'react-icons/fa';
import { BsImageFill } from 'react-icons/bs';

const CreateTweet: React.FC = () => {
    const { userInfo } = useContext(AuthContext);

    return (
        <TweetForm>
            <div className='userPhoto'>
                <Link to='/profile'>
                    <img 
                        src={userInfo?.profilePic} 
                        alt={userInfo?.username} 
                    />
                </Link>
            </div>
            <div className='formContent'>
                <div className='formBox'>
                    <textarea placeholder="What's happening?" />
                </div>
                <Divider />
                <div className='formOptions'>
                    <div className='options'>
                        <div className='upload'>
                            <input
                                style={{ display: 'none' }}
                                accept="image/*"
                                id='contained-button-file'
                                multiple
                                type='file'
                            />
                            <label htmlFor='contained-button-file'>
                                <Button 
                                    variant='text'
                                    color='primary' 
                                    component='span'
                                    size='small'>
                                    <BsImageFill />
                                </Button>
                            </label>
                        </div>
                        <div className='addEmoji'>
                            <Button 
                                variant='text'
                                color='primary' 
                                component='span'
                                size='small'>
                                <FaSmile />
                            </Button>
                        </div>
                    </div>
                    <div className='submitButton'>
                        <Button 
                            style={{ 
                                color: '#fff', 
                                borderRadius: '50px',
                                textTransform: 'capitalize'
                            }}
                            variant='contained' 
                            disableElevation
                            size='small'
                            color='primary'
                            type='submit'>
                            Tweet
                        </Button>
                    </div>
                </div>
            </div>
        </TweetForm>
    )
}

export default CreateTweet;