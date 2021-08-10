import useUserInfo from '../../hooks/useUserInfo';
import { PageTitle } from '../../styles/headings';
import { ProfileContainer } from '../../styles/profile';
import ProfileHeader from './ProfileHeader';

const UserProfile: React.FC = () => {
	const { user } = useUserInfo();

	return (
		<ProfileContainer>
			<PageTitle>{user?.user?.name.split(' ')[0]}</PageTitle>
			<ProfileHeader />
		</ProfileContainer>
	);
};

export default UserProfile;
