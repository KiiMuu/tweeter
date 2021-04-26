import styled from 'styled-components';
import { centerElement, bounceAnimation } from '../theme/mixins';

export const FallbackScreen = styled.div`
    ${centerElement};
    img {
        width: 5rem;
        height: 5rem;
        animation: bounce 1s infinite ease-in-out;
    }
    ${bounceAnimation};
`;