import { AlertStyles } from '../../styles/notifiers';
import { WhoToFollowSection } from '../../styles/lists';
import { Spin } from '../../styles/spinners';
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
}

const WhoToFollowList: React.FC<Props> = ({
	whoToFollowLoading,
	whoToFollowError,
	whoToFollowUsers,
	onLoadMore,
	page,
}) => {
	if (whoToFollowLoading)
		return (
			<span
				style={{
					display: 'flex',
					justifyContent: 'center',
					marginTop: '30px',
					overflow: 'hidden',
				}}
			>
				<Spin></Spin>
			</span>
		);
	if (whoToFollowError)
		return (
			<AlertStyles style={{ marginTop: '20px' }}>
				<Alert severity='error' icon={false}>
					{whoToFollowError}
				</Alert>
			</AlertStyles>
		);

	console.log('LEN', whoToFollowUsers?.length);
	console.log('PAGE', page);

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
								<UserCard
									user={user}
									key={user._id}
									paddingVal='7px 0'
								/>
							))}
					</List>
				</Grid>
				{page <= whoToFollowUsers?.length ? (
					<Button
						variant='text'
						color='primary'
						onClick={() => onLoadMore()}
					>
						Show more
					</Button>
				) : null}
			</div>
		</WhoToFollowSection>
	);
};

export default WhoToFollowList;
