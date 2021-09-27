import styled from 'styled-components';
import { centerElement, bounceAnimation } from '../theme/mixins';

export const FallbackScreen = styled.div`
	${centerElement};
	img {
		width: 5rem;
		height: 5rem;
		/* animation: bounce 1s infinite ease-in-out; */
	}
	/* ${bounceAnimation}; */
`;

export const Spin = styled.div`
	width: 18px;
	height: 18px;
	border-width: 2px;
	border-style: solid;
	border-color: var(--mainColor) var(--mainColor) transparent;
	border-radius: 50%;
	animation: spin 0.56s linear infinite;

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;

export const StyledTyping = styled.div`
	margin-bottom: 30px;
	width: 70px;
	height: 30px;
	position: relative;
	background: rgba(0, 0, 0, 0.05);
	border-radius: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	&::before {
		content: ' ';
		left: -10px;
		bottom: -10px;
		border: solid transparent;
		border-top-color: #ecedee;
		height: 0px;
		width: 0;
		position: absolute;
		border-width: 10px;
		transform: rotate(45deg);
	}
	.dot {
		width: 6px;
		height: 6px;
		margin: 0 2px;
		background: var(--mainColor);
		border-radius: 50%;
		opacity: 0;
		animation: typing 1s infinite;
		&:nth-of-type(1) {
			animation-delay: 0s;
		}
		&:nth-of-type(2) {
			animation-delay: 0.2s;
		}
		&:nth-of-type(3) {
			animation-delay: 0.4s;
		}
	}
	@keyframes typing {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 0.8;
		}
		100% {
			opacity: 0;
		}
	}
`;
