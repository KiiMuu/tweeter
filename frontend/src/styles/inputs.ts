import styled from 'styled-components';

export const TextField = styled.input`
	width: 100%;
	height: 40px;
	border-radius: 50px;
	border: 1px solid transparent;
	font-size: 15px;
	background: #eff3f4;
	padding-left: 20px;
	color: rgb(15, 20, 25);
	outline: none;
    line-height: 3.5;
	&:focus {
		border: 1px solid var(--mainColor);
	}
`;
