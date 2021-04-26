import { FallbackScreen } from '../styles/spinners';

const FallbackLoader: React.FC = () => {
    return (
        <FallbackScreen>
            <img
                src='/images/tweeter-logo.png' 
                alt='Tweeter Logo' 
                draggable='false'
            />
        </FallbackScreen>
    )
}

export default FallbackLoader;