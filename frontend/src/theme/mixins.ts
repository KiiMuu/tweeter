export const centerElement = () => {
    return`
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    `;
}

export const bounceAnimation = () => {
    return`
        @keyframes bounce {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            65% {
                transform: scale(.88);
                opacity: .88;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
}