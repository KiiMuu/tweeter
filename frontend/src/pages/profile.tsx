import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HomeLayout from '../components/home/HomeLayout';
import UserProfile from '../components/profile/UserProfile';
import UserContext from '../context/contexts/userContext';
import { UserInfoProps } from '../typings';

const Profile = () => {
	const { username } = useParams<UserInfoProps['username']>();
	const {
		getUserProfile,
		userProfile,
		userProfileLoading,
		userProfileError,
	} = useContext(UserContext);

	useEffect(() => {
		getUserProfile(username);
		// eslint-disable-next-line
	}, [username]);

	return (
		<HomeLayout>
			<UserProfile
				user={userProfile}
				userProfileLoading={userProfileLoading}
				userProfileError={userProfileError}
			/>
		</HomeLayout>
	);
};

export default Profile;
