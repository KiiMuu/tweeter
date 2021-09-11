import { Link } from 'react-router-dom';
import { WhatsHappeningSection } from '../../styles/lists';
import { UserInfoProps, TweetaProps } from '../../typings';
import UserCard from '../layout/UserCard';
import getTimeDifference from '../../helpers/geTimeDifference';
import { AlertStyles } from '../../styles/notifiers';
import { Spin } from '../../styles/spinners';
import { Alert } from '@material-ui/lab';
import {
	Typography,
	Grid,
	List,
	Card,
	CardContent,
	CardMedia,
	CardHeader,
	Avatar,
	makeStyles,
	Theme,
	createStyles,
	IconButton,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { AiOutlineEye } from 'react-icons/ai';

interface Props {
	whatsHappeningLoading: boolean;
	whatsHappeningError: null | string;
	whatsHappeningData: {
		joinedADayBefore: UserInfoProps[];
		topLiked: TweetaProps[];
	};
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			background: '#fff',
			marginTop: '10px',
		},
		media: {
			height: 0,
			paddingTop: '56.25%',
		},
		avatar: {
			backgroundColor: red[500],
		},
		content: {
			paddingBottom: '0',
		},
		icon: {
			fontSize: '18px',
		},
		link: {
			color: '#000',
		},
	})
);

const WhatsHappening: React.FC<Props> = ({
	whatsHappeningLoading,
	whatsHappeningError,
	whatsHappeningData,
}) => {
	const classes = useStyles();

	if (whatsHappeningLoading)
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
	if (whatsHappeningError)
		return (
			<AlertStyles style={{ marginTop: '20px' }}>
				<Alert severity='error' icon={false}>
					{whatsHappeningError}
				</Alert>
			</AlertStyles>
		);

	const renderTopTweets = (tweeta: TweetaProps) => (
		<Card className={classes.root} key={tweeta?._id}>
			<CardHeader
				avatar={
					<Avatar aria-label='user' className={classes.avatar}>
						<img
							src={tweeta?.postedBy?.profilePic}
							alt={tweeta?.postedBy?.username}
							width={40}
							height={40}
						/>
					</Avatar>
				}
				action={
					<IconButton aria-label='view' className={classes.icon}>
						<Link
							to={`/tweeta/${tweeta._id}`}
							className={classes.link}
						>
							<AiOutlineEye />
						</Link>
					</IconButton>
				}
				title={`By ${tweeta?.postedBy?.name}`}
				subheader={getTimeDifference(
					new Date(),
					new Date(tweeta?.createdAt)
				)}
			/>
			{tweeta?.images?.length > 0 && (
				<CardMedia
					className={classes.media}
					image={tweeta?.images[0]?.url}
					title={tweeta?.content}
				/>
			)}
			<CardContent className={classes.content}>
				<Typography variant='body2' color='textSecondary' component='p'>
					{tweeta?.content}
				</Typography>
			</CardContent>
		</Card>
	);

	return (
		<WhatsHappeningSection>
			<div className='mainContent'>
				<Typography style={{ fontWeight: 'bold' }} variant='h6'>
					What’s happening
				</Typography>
				{whatsHappeningData?.joinedADayBefore.length && (
					<>
						<div className='users'>
							<span className='typeText'>
								joined a day before
							</span>
							<Grid item xs={12}>
								<List dense={false}>
									{whatsHappeningData?.joinedADayBefore.map(
										(user: UserInfoProps) => (
											<UserCard
												user={user}
												key={user._id}
											/>
										)
									)}
								</List>
							</Grid>
						</div>
						<div className='topLikedTweets'>
							<span className='typeText'>Top liked tweets</span>
							<Grid container spacing={0}>
								<Grid item xs={12}>
									{whatsHappeningData?.topLiked.map(
										(tweeta: TweetaProps) =>
											renderTopTweets(tweeta)
									)}
								</Grid>
							</Grid>
						</div>
					</>
				)}
			</div>
		</WhatsHappeningSection>
	);
};

export default WhatsHappening;
