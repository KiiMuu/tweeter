import { MediaProps, TweetaMedia } from '../../../typings';
import { Spin } from '../../../styles/spinners';

const Media: React.FC<MediaProps> = ({ media, loading, error }) => {
	const showMedia = () => (
		<div style={{ padding: '20px' }}>
			{media?.map((media: TweetaMedia) => (
				<p>{JSON.stringify(media)}</p>
			))}
		</div>
	);

	console.log({ media });

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
		<p>No media</p>
	) : (
		showMedia()
	);
};

export default Media;
