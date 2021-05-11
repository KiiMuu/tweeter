import { Fragment, useContext, useEffect } from 'react';
import FileResizer from 'react-image-file-resizer';
import TweetaContext from '../../context/contexts/tweetaContext';
import { BsImageFill } from 'react-icons/bs';

import { Button } from '@material-ui/core';

interface Image {
    public_id: string,
    url: string,
}

interface ChildProps {
    images: Image[],
    setImages: Function,
}

const FileUpload: React.FC<ChildProps> = ({ images, setImages }) => {
    const {
        addTweetaImgError,
        addTweetaImgSuccess,
        addTweetaImgs,
        images: fileChunks,
    } = useContext(TweetaContext);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        let files = e.target.files;

        if (files) {
            for (let i = 0; i < files.length; i++) {
                FileResizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, uri => {
                    addTweetaImgs({ images: uri });
                }, 'base64');
            }
        }
    }

    useEffect(() => {
        if (addTweetaImgError) {
            console.log({addTweetaImgError});
        }

        if (addTweetaImgSuccess) {
            let uploadedFiles = images;

            // if (fileChunks !== undefined) {
            // }
            uploadedFiles.push(fileChunks);

            setImages(uploadedFiles);
        }
    }, [addTweetaImgError, addTweetaImgSuccess, images, fileChunks, setImages]);

    return (
        <Fragment>
            <input
                style={{ display: 'none' }}
                accept="image/*"
                id='contained-button-file'
                multiple
                type='file'
                onChange={handleUpload}
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
        </Fragment>
    )
}

export default FileUpload;