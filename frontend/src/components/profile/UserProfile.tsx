import { PageTitle } from '../../styles/headings';
import { ProfileContainer } from '../../styles/profile';
import ProfileHeader from './ProfileHeader';
import ProfileTabs from './profileTabs/ProfileTabs';
import { UserInfoProps } from '../../typings';
import { Spin } from '../../styles/spinners';

const UserProfile: React.FC<UserInfoProps> = ({
	user,
	userProfileLoading,
	userProfileError,
}) => {
	if (userProfileLoading)
		return (
			<span
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100%',
				}}
			>
				<Spin></Spin>
			</span>
		);
	if (userProfileError) return <h4>{userProfileError}</h4>;
	if (!user?.user)
		return (
			<span
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100%',
				}}
			>
				User not found!
			</span>
		);

	return (
		<ProfileContainer>
			<PageTitle>{user?.user?.name.split(' ')[0]}</PageTitle>
			<ProfileHeader user={user} />
			<ProfileTabs />
		</ProfileContainer>
	);
};

export default UserProfile;
