import styled from 'styled-components';

export const StyledAvatarGroup = styled.div`
	margin-right: 10px;
	display: flex;
	div.MuiAvatar-root {
		&:not(:first-child) {
			margin-left: -25px;
		}
	}
`;
