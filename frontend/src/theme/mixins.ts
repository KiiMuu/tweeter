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

export const customMUIButton = () => {
    return`
        font-size: 14px;
        text-transform: lowercase;
        border-radius: 50%;
        padding: 5px;
        min-width: 0;
        color: #000;
        svg {
            margin-right: 3px;
        }
    `;
}