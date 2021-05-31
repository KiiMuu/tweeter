import { useCallback, useContext, useEffect, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import FileResizer from 'react-image-file-resizer';
import { BiCamera, BiX } from 'react-icons/bi';
import useUserInfo from '../../hooks/useUserInfo';
import { UserEdit } from '../../styles/profile';
import UserContext from '../../context/contexts/userContext';
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
    setProfilePic: Function,
    setName: Function,
    name: string,
}

const EditProfile: React.FC<ChildProps> = ({ 
    setProfilePic,
    setName,
    name,
}) => {
    const { user } = useUserInfo();
    const [croppedImage, setCroppedImage] = useState<any>(null);
    const [imageSrc, setImageSrc] = useState<string>('');
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [bio, setBio] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [website, setWebsite] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );
    const { open, setOpen, handleClose } = useSnackBar();

    // * state
    const { 
        addProfilePicLoading,
        addProfilePicSuccess,
        profilePic: profilePhoto,
        addUserPic,
    } = useContext(UserContext);
    
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    }

    const handleProfilePic = (e: React.ChangeEvent<HTMLInputElement>) => {
        let files = e.target.files;
    
        if (files) {
            FileResizer.imageFileResizer(files[0], 720, 720, 'JPEG', 100, 0, (uri: any) => {
                setImageSrc(uri);
            }, 'base64');
        }
    }

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
            );
            setCroppedImage(croppedImage);
            addUserPic({ profilePic: croppedImage });
        } catch (e) {
            console.error(e);
        }
        // eslint-disable-next-line
    }, [croppedAreaPixels, imageSrc]);

    const onCancel = useCallback(() => {
        setImageSrc('');
    }, []);

    useEffect(() => {
        if (addProfilePicSuccess) {
            setProfilePic(profilePhoto);
            setOpen(true);
            setImageSrc('');
        }
        // eslint-disable-next-line
    }, [addProfilePicSuccess]);

    return (
        <UserEdit>
            <Snackbar 
                style={{ zIndex: 999999 }}
                open={open}
                onClose={handleClose}
                autoHideDuration={3000}
                message='Photo has been uploaded'
            />
            <div className='cover'>
                <div id='overlay'></div>
                <img src={user?.user?.coverPhoto} alt={user?.user?.username} />
                <div className='coverActions'>
                    <Tooltip title='Add photo' arrow>
                        <Button
                            color='primary'
                        >
                            <BiCamera />
                        </Button>
                    </Tooltip>
                    <Tooltip title='Remove' arrow>
                        <Button color='primary'>
                            <BiX />
                        </Button>
                    </Tooltip>
                </div>
            </div>
            {imageSrc && (
                <ImageCropper 
                    imageSrc={imageSrc} 
                    showCroppedImage={showCroppedImage} 
                    onCropComplete={onCropComplete}
                    onCancel={onCancel}
                />
            )}
            <div className='pic'>
                <img 
                    src={profilePhoto?.url ? croppedImage : user?.user?.profilePic} 
                    alt={user?.user?.username}
                />
                <div className='picActions'>
                    <input
                        style={{ display: 'none' }}
                        accept="image/*"
                        id='contained-button-file'
                        multiple
                        type='file'
                        onChange={handleProfilePic}
                    />
                    <Tooltip title='Change photo' arrow>
                        <label htmlFor='contained-button-file'>
                            <Button 
                                variant='text'
                                color='primary' 
                                component='span'
                                size='small'>
                                {addProfilePicLoading ? <Spin></Spin> : <BiCamera />}
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
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </div>
        </UserEdit>
    )
}

export default EditProfile;