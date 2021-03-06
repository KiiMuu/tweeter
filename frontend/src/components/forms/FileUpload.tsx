import { Fragment, useContext, useEffect } from 'react';
import FileResizer from 'react-image-file-resizer';
import TweetaContext from '../../context/contexts/tweeta';
import { BsImageFill } from 'react-icons/bs';
import { IconButton } from '@material-ui/core';

interface Image {
	public_id: string;
	url: string;
}

interface ChildProps {
	images: Image[];
	setImages: Function;
}

const FileUpload: React.FC<ChildProps> = ({ images, setImages }) => {
	const {
		addTweetaImgSuccess,
		addTweetaImgs,
		images: fileChunks,
	} = useContext(TweetaContext);

	const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		let files = e.target.files;

		if (files) {
			for (let i = 0; i < files.length; i++) {
				FileResizer.imageFileResizer(
					files[i],
					720,
					720,
					'JPEG',
					100,
					0,
					(uri: any) => {
						addTweetaImgs({ images: uri });
					},
					'base64'
				);
			}
		}
	};

	useEffect(() => {
		if (addTweetaImgSuccess) {
			let uploadedFiles = images;

			if (fileChunks !== undefined) {
				uploadedFiles.push(fileChunks);

				setImages(uploadedFiles);
			}
		}
		// eslint-disable-next-line
	}, [addTweetaImgSuccess, images, fileChunks]);

	return (
		<Fragment>
			<input
				style={{ display: 'none' }}
				accept='image/*'
				id='contained-button-file'
				multiple
				type='file'
				onChange={handleUpload}
			/>
			<label htmlFor='contained-button-file'>
				<IconButton color='primary' component='span' size='small'>
					<BsImageFill />
				</IconButton>
			</label>
		</Fragment>
	);
};

export default FileUpload;
