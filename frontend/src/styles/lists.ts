import styled from 'styled-components';

export const Sider = styled.aside`
	height: 100vh;
	display: flex;
	align-items: start;
	justify-content: center;
	ul {
		position: fixed;
		margin: 0;
		padding: 20px 0 0 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		li {
			&:first-child {
				display: block;
				margin: 0 auto 20px auto;
				button {
					width: 100%;
				}
				a {
					color: var(--mainColor);
					font-size: 35px;
				}
			}
			&:not(:first-child) {
				padding-top: 10px;
			}
			button {
				width: 100%;
			}
			a,
			span {
				color: var(--darkColor);
				font-size: 25px;
				text-decoration: none;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.linkTitle {
					font-size: 15px;
					margin-left: 15px;
					font-weight: 900;
					@media screen and (max-width: 1100px) {
						display: none;
					}
				}
			}
		}
	}
`;

export const UserCardStyled = styled.div`
	padding: 10px var(--paddingLeftRight);
`;

export const WhoToFollowSection = styled.section`
	padding: 10px var(--paddingLeftRight);
	.mainContent {
		background: #f7f9f9;
		border-radius: var(--br);
		padding: 20px;
	}
`;
