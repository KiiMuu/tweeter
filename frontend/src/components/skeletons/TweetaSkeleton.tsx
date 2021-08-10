import { Skeleton } from '@material-ui/lab';
import { SkeletonLoading } from '../../styles/home';

const TweetaSkeleton: React.FC = () => {
	return (
		<SkeletonLoading>
			<div style={{ display: 'flex' }}>
				<Skeleton variant='circle' width={40} height={40} />
				<Skeleton
					height={40}
					width='100%'
					style={{ margin: '0 0 10px 10px' }}
				/>
			</div>
			<Skeleton variant='rect' height='150px' />
			<Skeleton height={40} style={{ marginBottom: 6 }} />
		</SkeletonLoading>
	);
};

export default TweetaSkeleton;
