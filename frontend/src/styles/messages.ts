import styled from 'styled-components';

interface UserNames {
	current: string;
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
	.messagesArea,
	.heading {
		padding: 10px var(--paddingLeftRight);
		box-shadow: 0px 0px 5px rgb(0 0 0 / 10%);
	}
	.heading {
		background: var(--grayColor);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.messagesArea {
		background: var(--grayColor);
		height: calc(100% - 102px);
		overflow-y: auto;
		overflow-wrap: break-word;
		word-wrap: break-word;
		word-break: break-all;
		hyphens: auto;
		.messages {
			display: flex;
			flex: 0 1 auto;
			flex-flow: column nowrap;
			justify-content: flex-end;
			padding-bottom: 20px;
		}
	}
`;

export const StyledMessageInput = styled.form`
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
	&:not(:last-child) {
		margin-bottom: 10px;
	}
	flex: none;
	.msg {
		padding: 5px 10px;
		border-radius: var(--br);
		box-shadow: 0px 0px 5px rgb(0 0 0 / 10%);
		${props =>
			props.current === props.you
				? {
						background: 'var(--mainColor)',
						color: '#fff',
				  }
				: {
						background: '#fff',
				  }}
		.username {
			font-weight: 600;
		}
	}
	.msgDateSeen {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 5px;
		color: var(--textGray);
	}
	${props =>
		props.current === props.you
			? {
					alignSelf: 'flex-end',
			  }
			: {
					alignSelf: 'flex-start',
			  }}
`;

export const StyledEditForm = styled.div`
	padding: 10px var(--paddingLeftRight);
	margin-top: 30px;
`;
