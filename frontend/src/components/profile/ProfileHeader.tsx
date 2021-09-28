import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Snackbar,
	IconButton,
	Tooltip,
} from '@material-ui/core';
import { format } from 'date-fns';
import useUserInfo from '../../hooks/useUserInfo';
import { ProfileHeadContainer } from '../../styles/profile';
import EditProfile from './EditProfile';
import Following from './Following';
import Followers from './Followers';
import {
	HiOutlineLocationMarker,
	HiOutlineLink,
	CgTree,
	BiCalendar,
	AiOutlineMessage,
} from 'react-icons/all';
import UserContext from '../../context/contexts/user';
import SocketContext from '../../context/contexts/socket';
import useSnackBar from '../../hooks/useSnackBar';
import { Spin } from '../../styles/spinners';
import { UserInfoProps } from '../../typings';

interface Image {
	public_id: string;
	url: string;
}

const ProfileHeader: React.FC<UserInfoProps> = ({ user }) => {
	const { currentUser } = useUserInfo();
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [areFollowingVisible, setAreFollowingVisible] =
		useState<boolean>(false);
	const [areFollowersVisible, setAreFollowersVisible] =
		useState<boolean>(false);
	const [profilePic, setProfilePic] = useState<Image>({
		public_id: '',
		url: '',
	});
	const [coverPhoto, setCoverPhoto] = useState<Image>({
		public_id: '',
		url: '',
	});
	const [name, setName] = useState<string>(user?.user?.name);
	const [bio, setBio] = useState<string>(user?.user?.bio);
	const [location, setLocation] = useState<string>(user?.user?.location);
	const [website, setWebsite] = useState<string>(user?.user?.website);
	const [birthdate, setBirthdate] = useState<Date | undefined>(undefined);
	const [profileModal, setProfileModal] = useState<boolean>(false);
	const [coverModal, setCoverModal] = useState<boolean>(false);
	const { open, setOpen, handleClose } = useSnackBar();

	// * state
	const {
		editProfileError,
		editProfileLoading,
		editProfileSuccess,
		editUserProfile,
		follow,
	} = useContext(UserContext);
	const { socket } = useContext(SocketContext);

	const handleEditProfile = () => {
		editUserProfile({
			profilePic: profilePic?.url,
			coverPhoto: coverPhoto?.url,
			name,
			bio,
			location,
			website,
			birthdate,
		});
	};

	const handleFollow = () => {
		follow(user?.user?._id);

		!user?.user?.followers?.includes(currentUser?.user._id) &&
			socket?.emit('notification received', user?.user?._id);
	};

	useEffect(() => {
		if (editProfileSuccess) {
			setOpenDialog(false);
			setOpen(true);
		}

		if (editProfileError) {
			setOpen(true);
		}
		// eslint-disable-next-line
	}, [editProfileSuccess, editProfileError]);

	const editUserProfileDialog = () => (
		<Dialog
			fullWidth={true}
			maxWidth='sm'
			onClose={() => setOpenDialog(false)}
			aria-labelledby='scroll-dialog-title'
			aria-describedby='scroll-dialog-description'
			open={openDialog}
		>
			<DialogTitle id='scroll-dialog-title'>Edit Profile</DialogTitle>
			<DialogContent style={{ minHeight: '400px' }} dividers>
				<EditProfile
					setProfilePic={setProfilePic}
					setCoverPhoto={setCoverPhoto}
					setName={setName}
					name={name}
					bio={bio}
					setBio={setBio}
					location={location}
					setLocation={setLocation}
					website={website}
					setWebsite={setWebsite}
					birthdate={birthdate}
					setBirthdate={setBirthdate}
				/>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => setOpenDialog(false)}
					color='primary'
					variant='outlined'
				>
					Cancel
				</Button>
				<Button
					style={{
						color: '#fff',
					}}
					disableElevation
					color='primary'
					variant='contained'
					onClick={handleEditProfile}
				>
					{editProfileLoading ? <Spin></Spin> : 'Save changes'}
				</Button>
			</DialogActions>
		</Dialog>
	);

	return (
		<ProfileHeadContainer>
			<Snackbar
				open={open}
				onClose={handleClose}
				autoHideDuration={3000}
				message={
					editProfileSuccess
						? 'Profile has been updated'
						: editProfileError
				}
			/>
			<div className='cover'>
				<img
					src={user?.user?.coverPhoto}
					alt={user?.user?.username}
					onClick={() => setCoverModal(true)}
				/>
				<Dialog open={coverModal} onClose={() => setCoverModal(false)}>
					<img
						src={user?.user?.coverPhoto}
						alt={user?.user?.username}
					/>
				</Dialog>
			</div>
			<div className='headerContent'>
				<div className='pic'>
					<div className='picAndName'>
						<img
							src={user?.user?.profilePic}
							alt={user?.user?.username}
							onClick={() => setProfileModal(true)}
						/>
						<Dialog
							open={profileModal}
							onClose={() => setProfileModal(false)}
						>
							<img
								src={user?.user?.profilePic}
								alt={user?.user?.username}
							/>
						</Dialog>
						<div className='username'>
							<h3>{user?.user?.name}</h3>
							<span>@{user?.user?.username}</span>
						</div>
					</div>
					{currentUser?.user?._id === user?.user?._id ? (
						<div className='editProfileBtn'>
							<Button
								onClick={() => setOpenDialog(true)}
								variant='outlined'
								color='primary'
								size='small'
							>
								Edit Profile
							</Button>
							{editUserProfileDialog()}
						</div>
					) : (
						<div className='followBtn'>
							{currentUser?.user?._id !== user?.user?._id && (
								<Tooltip
									title={`Message ${user?.user?.username}`}
								>
									<Link
										to={`/messages/${user?.user?._id}/chat`}
									>
										<IconButton color='primary'>
											<AiOutlineMessage size={16} />
										</IconButton>
									</Link>
								</Tooltip>
							)}
							<Button
								variant={
									currentUser?.user?.following?.includes(
										user?.user._id
									)
										? 'contained'
										: 'outlined'
								}
								disableElevation
								color='primary'
								size='small'
								style={{
									color: currentUser?.user?.following?.includes(
										user?.user._id
									)
										? '#fff'
										: '',
								}}
								onClick={() => handleFollow()}
							>
								{currentUser?.user?.following?.includes(
									user?.user._id
								)
									? 'Following'
									: 'Follow'}
							</Button>
						</div>
					)}
				</div>
				{bio && <div className='userBio'>{bio}</div>}
				<div className='userInfo'>
					<ul>
						{location && (
							<li>
								<span>
									<HiOutlineLocationMarker />
								</span>
								<p>{location}</p>
							</li>
						)}
						{website && (
							<li>
								<span>
									<HiOutlineLink />
								</span>
								<p>
									<a
										href={website}
										target='_blank'
										rel='noreferrer'
									>
										{website.split('//')[1]}
									</a>
								</p>
							</li>
						)}
						{birthdate && (
							<li>
								<span>
									<CgTree />
								</span>
								<p>Born on {format(birthdate, 'MMMM yyyy')}</p>
							</li>
						)}
						<li>
							<span>
								<BiCalendar />
							</span>
							<p>
								Joined{' '}
								{format(
									new Date(user?.user?.createdAt),
									'MMMM yyyy'
								)}
							</p>
						</li>
					</ul>
				</div>
				<div className='following'>
					<Button
						variant='text'
						onClick={() => setAreFollowingVisible(true)}
						size='small'
					>
						<span className='followingLength'>
							{user?.user?.following?.length}
						</span>{' '}
						Following
					</Button>
					<Button
						variant='text'
						onClick={() => setAreFollowersVisible(true)}
						size='small'
					>
						<span className='followersLength'>
							{user?.user?.followers?.length}
						</span>{' '}
						Followers
					</Button>
					<Following
						areFollowingVisible={areFollowingVisible}
						setAreFollowingVisible={setAreFollowingVisible}
						user={user}
						currentUser={currentUser}
						follow={follow}
					/>
					<Followers
						areFollowersVisible={areFollowersVisible}
						setAreFollowersVisible={setAreFollowersVisible}
						user={user}
						currentUser={currentUser}
						follow={follow}
					/>
				</div>
			</div>
		</ProfileHeadContainer>
	);
};

export default ProfileHeader;
