import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Picker from 'emoji-picker-react';
import TweetaContext from '../../context/contexts/tweeta';
import FileUpload from '../forms/FileUpload';
import Snackbar from '../alerts/SnackBar';
import useSnackBar from '../../hooks/useSnackBar';
import { CreateTweetaProps } from '../../typings';
import { TweetForm } from '../../styles/home';
import { Spin } from '../../styles/spinners';
import { IconButton, Button, Divider } from '@material-ui/core';
import { FaSmile } from 'react-icons/fa';
import { VscClose } from 'react-icons/vsc';
import UserContext from '../../context/contexts/user';

interface Image {
	public_id: string;
	url: string;
}

const CreateTweet: React.FC<CreateTweetaProps> = ({ createTweeta }) => {
	const [content, setContent] = useState<string>('');
	const [images, setImages] = useState<Image[]>([]);
	const [pickerVisible, setPickerVisible] = useState<boolean>(false);

	const { open, setOpen, handleClose } = useSnackBar();
	const { currentUser } = useContext(UserContext);
	const {
		tweetaCreateError,
		tweetaCreateSuccess,
		tweetaCreateLoading,
		removeTweetaImgs,
	} = useContext(TweetaContext);

	const setInput =
		(setter: Function) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			setter(e.currentTarget.value);
		};

	const handleCreateTweet = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		createTweeta({ content, images });
	};

	const handleRemove = (id: string) => {
		removeTweetaImgs(id);

		let filteredImgs = images.filter(img => img.public_id !== id);

		setImages(filteredImgs);
	};

	const onEmojiClick = (
		e: React.MouseEvent<Element, MouseEvent>,
		emojiObject: any
	) => {
		e.preventDefault();
		setPickerVisible(false);
		setContent(`${content}${emojiObject.emoji}`);
	};

	useEffect(() => {
		if (tweetaCreateError) {
			setOpen(prev => !prev);
		}

		if (tweetaCreateSuccess) {
			setContent('');
			setImages([]);
			setOpen(prev => !prev);
		}

		// eslint-disable-next-line
	}, [tweetaCreateError, tweetaCreateSuccess]);

	return (
		<TweetForm onSubmit={handleCreateTweet}>
			<Snackbar
				open={open}
				handleClose={handleClose}
				autoHideDuration={3000}
				message='Tweet has been posted'
			/>
			<div className='userPhoto'>
				<Link to='/profile'>
					<img
						src={currentUser?.user?.profilePic}
						alt={currentUser?.user?.username}
					/>
				</Link>
			</div>
			<div className='formContent'>
				<div className='formBox'>
					<textarea
						placeholder="What's happening?"
						value={content}
						onChange={setInput(setContent)}
					/>
				</div>
				<div className='tweetaImages'>
					{tweetaCreateLoading && images?.length ? (
						<div className='spinner'>
							<Spin></Spin>
						</div>
					) : (
						images?.map(img => (
							<div className='imgBox' key={img.public_id}>
								<span>
									<VscClose
										onClick={() =>
											handleRemove(img.public_id)
										}
									/>
								</span>
								<img src={img.url} alt={img.url} />
							</div>
						))
					)}
				</div>
				<Divider />
				<div className='formOptions'>
					<div className='options'>
						<div className='upload'>
							<FileUpload images={images} setImages={setImages} />
						</div>
						<div className='addEmoji'>
							<IconButton
								onClick={() => {
									setPickerVisible(!pickerVisible);
								}}
							>
								<FaSmile />
							</IconButton>
							{pickerVisible ? (
								<div className='EmojiPicker'>
									<Picker
										native={true}
										onEmojiClick={onEmojiClick}
									/>
								</div>
							) : null}
						</div>
					</div>
					<div className='submitButton'>
						<Button
							style={{
								color: '#fff',
								borderRadius: '50px',
								textTransform: 'capitalize',
							}}
							variant='contained'
							disableElevation
							color='primary'
							type='submit'
							disabled={!content.trim() && !images.length}
						>
							Tweet
						</Button>
					</div>
				</div>
			</div>
		</TweetForm>
	);
};

export default CreateTweet;
