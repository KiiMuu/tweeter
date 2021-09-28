import styled from 'styled-components';

const typeTextStyle = () => {
	return `
        color: var(--textGray);
        font-size: 14px;
        opacity: 0.7;
        display: block;
        margin-top: 10px;
    `;
};

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
		@media screen and (max-width: 1100px) {
			display: none;
		}
		li {
			&:first-child {
				display: block;
				margin: 0 auto 20px auto;
				button {
					width: 100%;
					a {
						color: var(--mainColor);
						font-size: 35px;
					}
				}
			}
			&:not(:first-child) {
				padding-top: 10px;
			}
			a {
				text-decoration: none;
			}
			button {
				width: 100%;
				a,
				span {
					color: var(--darkColor);
					text-decoration: none;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.linkTitle {
						font-size: 15px;
						font-weight: 600;
					}
				}
			}
		}
	}
	.linkIcon {
		display: none;
		position: fixed;
		margin: 0;
		padding: 20px 0 0 0;
		list-style: none;
		@media screen and (max-width: 1100px) {
			display: block;
		}
	}
`;

export const ExtraContentStyled = styled.aside``;

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

export const WhatsHappeningSection = styled(WhoToFollowSection)`
	.mainContent {
		.users {
			.typeText {
				${typeTextStyle()}
			}
		}
		.topLikedTweets {
			.typeText {
				${typeTextStyle()}
			}
		}
	}
`;

export const StyledNotifications = styled.div`
	.markAllButton {
		padding: 10px var(--paddingLeftRight);
	}
`;

export const StyledMobNavigation = styled.header`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background: #fff;
	box-shadow: 0 0 5px 1px rgb(0 0 0 / 6%);
	ul {
		list-style: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0;
		padding: 10px 0 0;
		li {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			button {
				a,
				span {
					color: var(--darkColor);
				}
			}
		}
	}
`;
