import { AlertStyles } from '../../styles/notifiers';
import { WhoToFollowSection } from '../../styles/lists';
import { UserInfoProps } from '../../typings';
import UserCard from '../layout/UserCard';
import { Grid, List, Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

interface Props {
	whoToFollowUsers: UserInfoProps[];
	whoToFollowLoading: boolean;
	whoToFollowError: string | null;
	onLoadMore: Function;
	page: number;
	total: number;
}

const WhoToFollowList: React.FC<Props> = ({
	whoToFollowLoading,
	whoToFollowError,
	whoToFollowUsers,
	onLoadMore,
	page,
	total,
}) => {
	if (whoToFollowError)
		return (
			<AlertStyles style={{ marginTop: '20px' }}>
				<Alert severity='error' icon={false}>
					{whoToFollowError}
				</Alert>
			</AlertStyles>
		);

	return !whoToFollowUsers?.length ? null : (
		<WhoToFollowSection>
			<div className='mainContent'>
				<Typography style={{ fontWeight: 'bold' }} variant='h6'>
					Who to Follow
				</Typography>
				<Grid item xs={12}>
					<List dense={false}>
						{whoToFollowUsers?.length &&
							whoToFollowUsers?.map((user: UserInfoProps) => (
								<UserCard user={user} key={user._id} />
							))}
					</List>
				</Grid>
				{page < total ? (
					<Button
						variant='text'
						color='primary'
						onClick={() => onLoadMore()}
					>
						{whoToFollowLoading ? 'Loading...' : 'Show more'}
					</Button>
				) : null}
			</div>
		</WhoToFollowSection>
	);
};

export default WhoToFollowList;
