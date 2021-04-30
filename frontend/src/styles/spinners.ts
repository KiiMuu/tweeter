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

export const Spin = styled.div`
    width: 20px;
    height: 20px;
    border-width: 3px;
    border-style: solid;
    border-color: var(--mainColor) var(--mainColor) transparent;
    border-radius: 50%;
    animation: spin .76s linear infinite;

    @keyframes spin {
        from {
           transform: rotate(0deg); 
        }
        to {
           transform: rotate(359deg); 
        }
    }
`;