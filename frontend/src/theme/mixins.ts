export const centerElement = () => {
	return `
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    `;
};

export const centerElementAlt = () => {
	return `
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    `;
};

export const bounceAnimation = () => {
	return `
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
};

export const customMUIButton = () => {
	return `
        font-size: 17px;
        text-transform: lowercase;
        border-radius: 50%;
        padding: 5px;
        min-width: 0;
        color: #000;
        svg {
            margin-right: 3px;
        }
    `;
};

export const overlay = () => {
	return `
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0 0 0 / 30%);
    `;
};
