import styled from 'styled-components';
import { centerElementAlt, overlay } from '../../theme/mixins';

export const ProfileContainer = styled.div`
	border-right: 1px solid var(--borderColor);
`;

export const ProfileHeadContainer = styled.div`
	position: relative;
	.cover {
		img {
			width: 100%;
			height: 200px;
			object-fit: cover;
			cursor: pointer;
		}
	}
	.headerContent {
		padding: 10px var(--paddingLeftRight);
	}
	.pic {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
		.picAndName {
			display: flex;
			flex-direction: column;
			img {
				width: 120px;
				height: 120px;
				border-radius: 50%;
				object-fit: cover;
				position: absolute;
				top: 130px;
				border: 3px solid #fff;
				cursor: pointer;
			}
			.username {
				margin-top: 15px;
				h3 {
					margin: 0;
					color: var(--darkColor);
				}
				span {
					color: #999;
				}
			}
		}
	}
	.userBio {
		margin-top: 15px;
	}
	.userInfo {
		ul {
			display: flex;
			flex-wrap: wrap;
			list-style: none;
			padding: 0;
			li {
				&:not(:last-child) {
					margin-right: 15px;
				}
				display: flex;
				align-items: center;
				color: var(--textGray);
				span {
					margin-right: 7px;
					display: inherit;
					font-size: 18px;
				}
				p {
					margin: 0;
					a {
						text-decoration: none;
						color: var(--mainColor);
					}
				}
			}
		}
	}
	.following {
		display: flex;
		button {
			/* &:not(:first-child) {
				margin-left: 15px;
			}
			margin: 0; */
			span.followersLength,
			span.followingLength {
				color: var(--darkColor);
				font-weight: bold;
				margin-right: 5px;
			}
		}
	}
`;

export const UserEdit = styled.div`
	.cover {
		position: relative;
		height: 200px;
		width: 100%;
		#overlay {
			${overlay()};
		}
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		.coverActions {
			z-index: 2;
			${centerElementAlt()}
			label > span {
				font-size: 25px;
			}
		}
	}
	.cropper-window {
		.controls {
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: flex-end;
			padding: 20px;
			.actions {
				display: flex;
				button {
					margin-left: 10px;
				}
			}
		}
		position: absolute;
		height: 100%;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 99999;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.pic {
		width: 100px;
		height: 100px;
		position: relative;
		bottom: 50px;
		left: 20px;
		img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
			object-fit: cover;
			position: absolute;
			border: 3px solid #fff;
		}
		.picActions {
			${centerElementAlt()}
			label > span {
				font-size: 25px;
			}
		}
	}
`;
