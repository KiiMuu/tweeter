import { useContext, useState } from 'react';
import { CreateTweetaProps } from '../../typings';
import { Reply } from '../../styles/tweeta';
import FileUpload from './FileUpload';
import { Button } from '@material-ui/core';
import TweetaContext from '../../context/contexts/tweeta';
import { Spin } from '../../styles/spinners';
import { VscClose } from 'react-icons/vsc';

interface Image {
	public_id: string;
	url: string;
}

const ReplyForm: React.FC<CreateTweetaProps> = ({ singleTweeta }) => {
	const [content, setContent] = useState<string>('');
	const [images, setImages] = useState<Image[]>([]);

	const { createTweeta, tweetaCreateLoading, removeTweetaImgs } =
		useContext(TweetaContext);

	const handleCreateReply = () => {
		createTweeta({
			content,
			images,
			replyTo: singleTweeta?.tweeta?._id,
		}).then(() => {
			setContent('');
			setImages([]);
		});
	};

	const handleRemove = (id: string) => {
		removeTweetaImgs(id);

		let filteredImgs = images.filter(img => img.public_id !== id);

		setImages(filteredImgs);
	};

	return (
		<Reply>
			<input
				placeholder='Tweet your reply'
				value={content}
				onChange={e => setContent(e.target.value)}
			/>
			<div className='tweetaImages'>
				{images?.map(img => (
					<div className='imgBox' key={img.public_id}>
						<span>
							<VscClose
								onClick={() => handleRemove(img.public_id)}
							/>
						</span>
						<img src={img.url} alt={img.url} />
					</div>
				))}
			</div>
			<FileUpload images={images} setImages={setImages} />
			<Button
				style={{
					color: '#fff',
					textTransform: 'capitalize',
				}}
				color='primary'
				variant='contained'
				disableElevation
				onClick={handleCreateReply}
				disabled={!content.trim() && !images.length}
			>
				{tweetaCreateLoading ? <Spin></Spin> : 'Tweet'}
			</Button>
		</Reply>
	);
};

export default ReplyForm;
