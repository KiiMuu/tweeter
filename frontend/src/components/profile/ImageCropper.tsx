import { useContext, useState } from 'react';
import UserContext from '../../context/contexts/userContext';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import { Button, Slider } from '@material-ui/core';
import { Spin } from '../../styles/spinners';

interface ChildProps {
	imageSrc: string;
	onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
	showCroppedImage: any;
	onCancel: any;
}

const ImageCropper: React.FC<ChildProps> = ({
	imageSrc,
	showCroppedImage,
	onCropComplete,
	onCancel,
}) => {
	const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);

	// * state
	const { addProfilePicLoading, addCoverPicLoading } =
		useContext(UserContext);

	return (
		<div className='cropper-window'>
			<div className='controls'>
				<Cropper
					image={imageSrc}
					crop={crop}
					zoom={zoom}
					aspect={4 / 3}
					onCropChange={setCrop}
					onCropComplete={onCropComplete}
					onZoomChange={setZoom}
				/>
				<Slider
					value={zoom}
					min={1}
					max={3}
					step={0.1}
					aria-labelledby='Zoom'
					onChange={(e, zoom) => setZoom(Number(zoom))}
				/>
				<div className='actions'>
					<Button
						onClick={onCancel}
						variant='outlined'
						color='primary'
					>
						Cancel
					</Button>
					<Button
						style={{ color: '#fff' }}
						onClick={showCroppedImage}
						disableElevation
						variant='contained'
						color='primary'
					>
						{addProfilePicLoading || addCoverPicLoading ? (
							<Spin></Spin>
						) : (
							'Save'
						)}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ImageCropper;
