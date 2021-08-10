import styled from 'styled-components';

export const TweetaPage = styled.div`
	.mainTweetaLoading {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 50px 20px;
	}
	.mainTweeta {
		background-color: rgb(29 161 242 / 20%);
	}
	.replies {
		padding-left: 40px;
		margin-bottom: 80px;
	}
`;

export const Reply = styled.form`
	display: flex;
	align-items: center;
	position: fixed;
	bottom: 0;
	right: 0;
	left: 0;
	padding: 10px 15px;
	background: var(--grayColor);
	.tweetaImages {
		display: flex;
		overflow: auto;
		::-webkit-scrollbar {
			height: 5px;
			border-radius: 10px;
			background-color: #ddd;
		}
		::-webkit-scrollbar-thumb {
			background-color: #666;
			border-radius: 10px;
		}
		.imgBox {
			position: relative;
			flex: 0 0 100%;
			&:not(:last-child) {
				margin-right: 10px;
			}
			&:hover {
				span {
					transition: 0.1s ease-in-out;
					transform: scale(1);
				}
			}
			span {
				position: absolute;
				cursor: pointer;
				right: 5px;
				top: 5px;
				background: rgba(0 0 0 / 30%);
				color: var(--lightColor);
				width: 20px;
				height: 20px;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: var(--br);
				transform: scale(0);
			}
			img {
				width: 100px;
				height: 50px;
				object-fit: cover;
				border-radius: var(--br);
				box-shadow: 0 0 5px 1px rgb(0 0 0 / 5%);
			}
		}
	}
	input {
		height: 45px;
		flex: 1;
		padding-left: 10px;
		outline: none;
		border: 1px solid #ddd;
		font-size: 16px;
	}
`;
