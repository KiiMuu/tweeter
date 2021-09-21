import styled from 'styled-components';

interface UserNames {
	me: string;
	you: string;
}

export const StyledAvatarGroup = styled.div`
	margin-right: 10px;
	display: flex;
	div.MuiAvatar-root {
		&:not(:first-child) {
			margin-left: -25px;
		}
	}
`;

export const StyledChatBox = styled.section`
	height: 100vh;
	position: relative;
	.heading {
		background: var(--grayColor);
	}
	.messagesArea {
		background: red;
		height: calc(100% - 50px);
	}
	.messagesArea,
	.heading {
		padding: 10px var(--paddingLeftRight);
	}
`;

export const StyledMessageInput = styled.div`
	position: absolute;
	background: var(--grayColor);
	bottom: 0;
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	.addEmoji {
		height: 100%;
		button {
			span {
				font-size: 20px;
			}
		}
		.EmojiPicker {
		}
	}
	input {
		height: 100%;
		width: 100%;
		padding-left: 10px;
		font-size: 17px;
		outline: none;
		border: none;
		color: var(--darkColor);
		caret-color: var(--mainColor);
		::placeholder {
			color: var(--textGray);
		}
	}
	button {
		height: 100%;
	}
`;

export const MessageBox = styled.div<UserNames>`
	background: #fff;
	padding: 10px;
	border-radius: var(--br);
	display: table;
	&:not(:last-child) {
		margin-bottom: 10px;
	}
	${props =>
		props.me === props.you
			? {
					background: 'yellow',
			  }
			: {
					background: 'green',
			  }}/* overflow-wrap: break-word;
	word-wrap: break-word;
	word-break: break-all;
	word-break: break-word;
	hyphens: auto; */
`;
