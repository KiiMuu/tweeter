import { TweetaProps } from '../../typings';
import { SingleTweeta } from '../../styles/home';

const SingleTweet: React.FC<TweetaProps> = ({ tweeta }) => {
    return (
        <SingleTweeta>
            <p>{tweeta.content}</p>
        </SingleTweeta>
    )
}

export default SingleTweet;