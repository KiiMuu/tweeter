import styled from 'styled-components';
import { centerElement } from '../../theme/mixins';

const authCommon = () => {
	return `
        height: 100vh;
        background: var(--mainColor);
        background-repeat: no-repeat;
        background-position: center center;
    `;
};

export const AuthPreview = styled.div`
	${authCommon()}
	background-image: url('/images/signup_preview.svg');
	background-image: url('/images/signup_preview.svg'),
		linear-gradient(var(--mainColor), var(--secondaryColor));
	background-size: contain;
`;

export const AuthForm = styled.div`
	background-color: var(--lightColor);
	height: 100vh;
	padding: 20px;
	${centerElement};
	flex-direction: column;
`;

export const Logo = styled.div`
	margin-top: 10px;
	img {
		width: 65px;
		height: 65px;
	}
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0 20px;
	@media screen and (max-width: 410px) {
		padding: 0;
	}
`;

export const FormAction = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

export const SignInScreen = styled.div`
	${authCommon()}
	background-image: url('/images/signin_preview.jpg');
	background-image: linear-gradient(
			to left,
			rgba(29, 161, 242, 0.71),
			rgba(37, 99, 235, 1)
		),
		url('/images/signin_preview.jpg');
	background-size: cover;
`;

export const SignInForm = styled.form`
	${centerElement};
	flex-direction: column;
	.signinFormContent {
		position: relative;
		background: var(--lightColor);
		border-radius: var(--br);
		padding: 50px 30px;
		box-shadow: 0 0 15px 5px rgba(0 0 0 / 20%);
		.flag {
			background-color: var(--mainColor);
			width: 10px;
			height: 10px;
			border-radius: 50%;
			position: absolute;
			top: 10px;
			right: 10px;
			&:before {
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				left: 0;
				bottom: 0;
				display: block;
				border-radius: 50%;
				animation: pulse 3s infinite ease-in-out;
			}
		}
		@keyframes pulse {
			0% {
				transform: scale(0);
				opacity: 0.7;
				background-color: rgba(37, 99, 235, 0.3);
			}
			65% {
				transform: scale(5);
				opacity: 0.88;
				background-color: rgba(37, 99, 235, 0.2);
			}
			100% {
				transform: scale(0.1);
				opacity: 0;
				background-color: rgba(37, 99, 235, 0.1);
			}
		}
	}
`;
