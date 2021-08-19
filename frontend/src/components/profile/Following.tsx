import { memo } from 'react';
import { Link } from 'react-router-dom';
import ScreenDialog from '../layout/ScreenDialog';
import { FollowerUser } from '../../typings';
import {
	Container,
	SnackbarContent,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemSecondaryAction,
	Button,
	createStyles,
	makeStyles,
	Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		snackBarContent: {
			background: '#fff',
			color: '#000',
			marginTop: '20px',
			boxShadow:
				'0px 3px 5px -1px rgb(0 0 0 / 8%), 0px 6px 10px 0px rgb(0 0 0 / 0%), 0px 1px 18px 0px rgb(0 0 0 / 0%)',
		},
		followingList: {
			backgroundColor: theme.palette.background.paper,
			marginTop: '20px',
		},
		title: {
			margin: theme.spacing(4, 0, 2),
		},
	})
);

interface FollowingProps {
	areFollowingVisible: boolean;
	setAreFollowingVisible: Function;
	following: FollowerUser[];
	name: string;
	// currentUserFollowing?: FollowerUser[];
	follow: Function;
}

const Following: React.FC<FollowingProps> = ({
	areFollowingVisible,
	setAreFollowingVisible,
	following,
	name,
	// currentUserFollowing,
	follow,
}) => {
	const classes = useStyles();

	// console.log(currentUserFollowing);

	return (
		<ScreenDialog
			fullScreen={true}
			open={areFollowingVisible}
			onClose={setAreFollowingVisible}
			okButton='Ok'
			title={`${name}'s Following`}
		>
			{following.length === 0 ? (
				<Container maxWidth='xl'>
					<SnackbarContent
						className={classes.snackBarContent}
						message={`${name} isn't following anyone`}
					/>
				</Container>
			) : (
				<Grid item xs={12}>
					<div className={classes.followingList}>
						<List dense={false}>
							{following.map(follower => (
								<ListItem
									button
									component={Link}
									to={follower.username}
									key={follower._id}
								>
									<ListItemAvatar>
										<Avatar>
											<img
												src={follower.profilePic}
												alt={follower.name}
												width={40}
												height={40}
											/>
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={follower.name}
										secondary={`@${follower.username}`}
									/>
									<ListItemSecondaryAction>
										<Button
											size='small'
											variant='outlined'
											color='primary'
											onClick={() => follow(follower._id)}
										>
											{/* {currentUserFollowing?.includes(
												follower._id
											)
												? 'Following'
												: 'Follow'} */}
											Follow
										</Button>
									</ListItemSecondaryAction>
								</ListItem>
							))}
						</List>
					</div>
				</Grid>
			)}
		</ScreenDialog>
	);
};

export default memo(Following);
