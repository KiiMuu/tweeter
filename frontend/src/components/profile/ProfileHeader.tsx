import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import useUserInfo from '../../hooks/useUserInfo';
import { ProfileHeadContainer } from '../../styles/profile';
import EditProfile from './EditProfile';
import { 
    HiOutlineLocationMarker,
    HiOutlineLink,
    CgTree,
    BiCalendar,
} from 'react-icons/all';
import UserContext from '../../context/contexts/userContext';
import useSnackBar from '../../hooks/useSnackBar';
import { Spin } from '../../styles/spinners';

interface Image {
    public_id: string,
    url: string,
}

const ProfileHeader: React.FC = () => {
    const { user } = useUserInfo();
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [profilePic, setProfilePic] = useState<Image>({
        public_id: '',
        url: '',
    });
    const [name, setName] = useState<string>(user.user.name);
    const [profileModal, setProfileModal] = useState<boolean>(false);
    const { open, setOpen, handleClose } = useSnackBar();

    // * state
    const { 
        editProfileError,
        editProfileLoading,
        editProfileSuccess,
        editUserProfile,
    } = useContext(UserContext);

    const handleEditProfile = () => {
        editUserProfile({
            profilePic: profilePic?.url,
            name,
        });
    }

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
            aria-describedby="scroll-dialog-description"
            open={openDialog}>
            <DialogTitle 
                id='scroll-dialog-title' 
            >
                Edit Profile
            </DialogTitle>
            <DialogContent style={{ minHeight: '400px' }} dividers>
                <EditProfile 
                    setProfilePic={setProfilePic} 
                    setName={setName}
                    name={name} 
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setOpenDialog(false)} 
                    color='primary' 
                    variant='outlined'>
                    Cancel
                </Button>
                <Button 
                    style={{
                        color: '#fff',
                    }}
                    disableElevation
                    color='primary' 
                    variant='contained'
                    onClick={handleEditProfile}>
                    {editProfileLoading ? <Spin></Spin> : 'Save changes'}
                </Button>
            </DialogActions>
        </Dialog>
    )

    return (
        <ProfileHeadContainer>
            <Snackbar 
                open={open}
                onClose={handleClose}
                autoHideDuration={3000}
                message={editProfileSuccess ? (
                    'Profile has been updated'
                ) : (
                    editProfileError
                )}
            />
            <div className='cover'>
                <img src={user?.user?.coverPhoto} alt={user?.user?.username} />
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
                    <div className='editProfile'>
                        <Button
                            onClick={() => setOpenDialog(true)} 
                            variant='outlined' 
                            color='primary'>
                            Edit Profile
                        </Button>
                        {editUserProfileDialog()}
                    </div>
                </div>
                <div className='userBio'>
                    my bio goes here
                </div>
                <div className='userInfo'>
                    <ul>
                        <li>
                            <span><HiOutlineLocationMarker /></span>
                            <p>Egypt, Cairo</p>
                        </li>
                        <li>
                            <span><HiOutlineLink /></span>
                            <p>
                                <a 
                                    href='https://kimofolio-kiimuu.vercel.app/'
                                    target='_blank'
                                    rel="noreferrer">
                                    kimofolio
                                </a>
                            </p>
                        </li>
                        <li>
                            <span><CgTree /></span>
                            <p>Born Jan 3, 1998</p>
                        </li>
                        <li>
                            <span><BiCalendar /></span>
                            <p>Joined {format(new Date(user?.user?.createdAt), 'MMMM yyyy')}</p>
                        </li>
                    </ul>
                </div>
                <div className='following'>
                    <p><span>44</span> Following</p>
                    <p><span>86</span> Followers</p>
                </div>
            </div>
        </ProfileHeadContainer>
    )
}

export default ProfileHeader;