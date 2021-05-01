import { TweetaProps } from '../../typings';

const SingleTweet: React.FC<TweetaProps> = ({ tweeta }) => {
    return (
        <div>
            <p>{tweeta.content}</p>
        </div>
    )
}

export default SingleTweet;