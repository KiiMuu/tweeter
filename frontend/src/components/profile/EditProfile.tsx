import { useCallback, useContext, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { BiCamera } from 'react-icons/bi';
import useUserInfo from '../../hooks/useUserInfo';
import { UserEdit } from '../../styles/profile';
import UserContext from '../../context/contexts/user';
import useSnackBar from '../../hooks/useSnackBar';
import { Spin } from '../../styles/spinners';
import ImageCropper from './ImageCropper';
import {
	Button,
	FormControl,
	Snackbar,
	TextField,
	Tooltip,
} from '@material-ui/core';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import getCroppedImg from '../../helpers/cropImg';
import { Area } from 'react-easy-crop/types';

interface ChildProps {
	setProfilePic: Function;
	setCoverPhoto: Function;
	setName: Function;
	setBio: Function;
	setLocation: Function;
	setWebsite: Function;
	setBirthdate: Function;
	name: string;
	bio: string;
	location: string;
	website: string;
	birthdate: Date | undefined;
}

const EditProfile: React.FC<ChildProps> = ({
	setProfilePic,
	setCoverPhoto,
	setName,
	name,
	setBio,
	bio,
	location,
	setLocation,
	website,
	setWebsite,
	birthdate,
	setBirthdate,
}) => {
	const { currentUser } = useUserInfo();
	const [croppedImage, setCroppedImage] = useState<any>(null);
	const [profileSrc, setProfileSrc] = useState<string>('');
	const [coverSrc, setCoverSrc] = useState<string>('');
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
	const { open, setOpen, handleClose } = useSnackBar();

	// * state
	const {
		addProfilePicLoading,
		profilePic: profilePhoto,
		addUserPic,
		addCoverPicLoading,
		coverPhoto,
		addUserCover,
	} = useContext(UserContext);

	const handleDateChange = (date: Date | null) => {
		setBirthdate(date);
	};

	const handleCoverPic = (e: React.ChangeEvent<HTMLInputElement>) => {
		let coverFiles = e.target.files;

		if (coverFiles) {
			let img = new Image();
			img.src = URL.createObjectURL(coverFiles[0]);
			setCoverSrc(img.src);
		}
	};

	const handleProfilePic = (e: React.ChangeEvent<HTMLInputElement>) => {
		let picFiles = e.target.files;

		if (picFiles) {
			let img = new Image();
			img.src = URL.createObjectURL(picFiles[0]);
			setProfileSrc(img.src);
		}
	};

	const onCropComplete = useCallback(
		(croppedArea: Area, croppedAreaPixels: Area) => {
			setCroppedAreaPixels(croppedAreaPixels);
		},
		[]
	);

	const showCroppedCover = useCallback(async () => {
		try {
			const croppedImage = await getCroppedImg(
				coverSrc,
				croppedAreaPixels
			);
			setCroppedImage(croppedImage);
			addUserCover({ coverPhoto: croppedImage }).then(() => {
				setCoverPhoto(coverPhoto);
				setOpen(true);
				setCoverSrc('');
			});
		} catch (e) {
			console.error(e);
		}
		// eslint-disable-next-line
	}, [croppedAreaPixels, coverSrc]);

	const showCroppedProfile = useCallback(async () => {
		try {
			const croppedImage = await getCroppedImg(
				profileSrc,
				croppedAreaPixels
			);
			setCroppedImage(croppedImage);
			addUserPic({ profilePic: croppedImage }).then(() => {
				setProfilePic(profilePhoto);
				setOpen(true);
				setProfileSrc('');
			});
		} catch (e) {
			console.error(e);
		}
		// eslint-disable-next-line
	}, [croppedAreaPixels, profileSrc]);

	const onCancel = useCallback(() => {
		setProfileSrc('');
		setCoverSrc('');
	}, []);

	return (
		<UserEdit>
			<Snackbar
				style={{ zIndex: 999999 }}
				open={open}
				onClose={handleClose}
				autoHideDuration={3000}
				message='Photo has been uploaded'
			/>
			{coverSrc && (
				<ImageCropper
					imageSrc={coverSrc}
					showCroppedImage={showCroppedCover}
					onCropComplete={onCropComplete}
					onCancel={onCancel}
				/>
			)}
			<div className='cover'>
				<div id='overlay'></div>
				<img
					src={
						coverPhoto?.url
							? croppedImage
							: currentUser?.user?.coverPhoto
					}
					alt={currentUser?.user?.username}
				/>
				<div className='coverActions'>
					<input
						style={{ display: 'none' }}
						accept='image/*'
						id='cover-pic'
						multiple
						type='file'
						onChange={handleCoverPic}
					/>
					<Tooltip title='Change Cover' arrow>
						<label htmlFor='cover-pic'>
							<Button
								variant='text'
								color='primary'
								component='span'
								size='small'
							>
								{addCoverPicLoading ? (
									<Spin></Spin>
								) : (
									<BiCamera />
								)}
							</Button>
						</label>
					</Tooltip>
				</div>
			</div>
			{profileSrc && (
				<ImageCropper
					imageSrc={profileSrc}
					showCroppedImage={showCroppedProfile}
					onCropComplete={onCropComplete}
					onCancel={onCancel}
				/>
			)}
			<div className='pic'>
				<img
					src={
						profilePhoto?.url
							? croppedImage
							: currentUser?.user?.profilePic
					}
					alt={currentUser?.user?.username}
				/>
				<div className='picActions'>
					<input
						style={{ display: 'none' }}
						accept='image/*'
						id='profile-pic'
						multiple
						type='file'
						onChange={handleProfilePic}
					/>
					<Tooltip title='Change Profile' arrow>
						<label htmlFor='profile-pic'>
							<Button
								variant='text'
								color='primary'
								component='span'
								size='small'
							>
								{addProfilePicLoading ? (
									<Spin></Spin>
								) : (
									<BiCamera />
								)}
							</Button>
						</label>
					</Tooltip>
				</div>
			</div>
			<div className='form'>
				<FormControl style={{ width: '100%', marginBottom: '20px' }}>
					<TextField
						type='text'
						label='Name'
						placeholder='Type your name'
						inputMode='text'
						variant='outlined'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</FormControl>
				<FormControl style={{ width: '100%', marginBottom: '20px' }}>
					<TextField
						type='text'
						label='Bio'
						placeholder='Type your bio'
						inputMode='text'
						variant='outlined'
						value={bio}
						onChange={e => setBio(e.target.value)}
					/>
				</FormControl>
				<FormControl style={{ width: '100%', marginBottom: '20px' }}>
					<TextField
						type='text'
						label='Location'
						placeholder='Type your location'
						inputMode='text'
						variant='outlined'
						value={location}
						onChange={e => setLocation(e.target.value)}
					/>
				</FormControl>
				<FormControl style={{ width: '100%' }}>
					<TextField
						type='text'
						label='Webiste'
						placeholder='Type your webiste URL'
						inputMode='text'
						variant='outlined'
						value={website}
						onChange={e => setWebsite(e.target.value)}
					/>
				</FormControl>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						margin='normal'
						id='date-picker-dialog'
						label='Choose your birthdate'
						format='MM/dd/yyyy'
						value={birthdate}
						onChange={handleDateChange}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
					/>
				</MuiPickersUtilsProvider>
			</div>
		</UserEdit>
	);
};

export default EditProfile;
