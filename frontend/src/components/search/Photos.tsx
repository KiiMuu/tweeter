import { TweetaMedia } from '../../typings';

interface Props {
	photos: TweetaMedia[];
}

const Photos: React.FC<Props> = ({ photos }) => {
	return <div>Photos - {photos?.length}</div>;
};

export default Photos;
