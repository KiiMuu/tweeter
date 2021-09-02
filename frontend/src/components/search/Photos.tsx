import { TweetaMedia, TweetaImg } from '../../typings';
import { AlertStyles } from '../../styles/notifiers';
import { Alert } from '@material-ui/lab';
import { Card, CardMedia, CardActions, makeStyles } from '@material-ui/core';

interface Props {
	searchTerm: string;
	photos: TweetaMedia;
}

const useStyles = makeStyles({
	root: {
		makeWidth: 345,
	},
});

const Photos: React.FC<Props> = ({ searchTerm, photos }) => {
	const classes = useStyles();

	return !photos?.length ? (
		<AlertStyles style={{ marginTop: '20px' }}>
			<Alert severity='info' icon={false}>
				No photos matched "`{searchTerm}`"
			</Alert>
		</AlertStyles>
	) : (
		photos?.map((photo: TweetaMedia) => (
			<Card key={photo._id} className={classes.root}>
				<CardActions>
					{photo.images?.map((img: TweetaImg) => (
						<CardMedia
							component='img'
							key={img.public_id}
							image={img.url}
							title={photo.content.substring(0, 30)}
							alt={img.url}
						/>
					))}
				</CardActions>
			</Card>
		))
	);
};

export default Photos;
