import styled from 'styled-components';

export const BigHeading = styled.div`
	h1 {
		color: var(--darkColor);
		font-size: 60px;
		margin: 0;
	}
	@media screen and (max-width: 640px) {
		h1 {
			font-size: 40px;
		}
	}
	@media screen and (max-width: 410px) {
		h1 {
			font-size: 28px;
		}
	}
`;

export const SubBigHeading = styled.div`
	p {
		color: var(--darkColor);
		margin: 0px 0 30px 0;
		font-size: 30px;
	}
	@media screen and (max-width: 410px) {
		p {
			font-size: 20px;
		}
	}
`;

export const NormaHeading = styled.div`
	h1 {
		margin: 0 0 5px 0;
		color: var(--mainColor);
	}
`;

export const SubNormaHeading = styled.div`
	p {
		margin: 0 0 20px 0;
		color: var(--grayDark);
	}
`;

export const PageTitle = styled.h3`
	margin: 0;
	border-bottom: 1px solid var(--borderColor);
	color: var(--darkColor);
	padding: 10px var(--paddingLeftRight);
`;
