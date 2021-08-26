import { useParams } from 'react-router-dom';
import {
	MediaProps,
	TweetaMedia,
	TweetaImg,
	UserInfoProps,
} from '../../../typings';
import { Spin } from '../../../styles/spinners';
import { Card, CardMedia, CardActions, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { AlertStyles } from '../../../styles/notifiers';

const useStyles = makeStyles({
	root: {
		makeWidth: 345,
	},
});

const Media: React.FC<MediaProps> = ({ media, loading, error }) => {
	const classes = useStyles();
	const { username } = useParams<UserInfoProps['username']>();

	const showMedia = () =>
		media?.map((media: TweetaMedia) => (
			<Card key={media._id} className={classes.root}>
				<CardActions>
					{media.images?.map((img: TweetaImg) => (
						<CardMedia
							component='img'
							key={img.public_id}
							image={img.url}
							title={media.content.substring(0, 30)}
							alt={img.url}
						/>
					))}
				</CardActions>
			</Card>
		));

	return loading ? (
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
	) : error ? (
		<h4>{error}</h4>
	) : !media?.length ? (
		<AlertStyles style={{ marginTop: '20px' }}>
			<Alert severity='info' icon={false}>
				No media created by {username}.
			</Alert>
		</AlertStyles>
	) : (
		showMedia()
	);
};

export default Media;
