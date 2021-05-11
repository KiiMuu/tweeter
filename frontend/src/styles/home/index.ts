import styled from 'styled-components';
import { customMUIButton } from '../../theme/mixins';

export const NewsFeedContainer = styled.div`
    border-right: 1px solid var(--borderColor);
`;

export const TweetForm = styled.form`
    padding: 10px var(--paddingLeftRight);
    border-bottom: 10px solid var(--grayColor);
    display: flex;
    max-height: 300px;
    position: relative;
    margin-bottom: 20px;
    .userPhoto {
        padding-right: 15px;
        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }
    .formContent {
        flex: 1;
        .formBox {
            padding-bottom: 5px;
            textarea {
                width: 100%;
                height: 70px;
                resize: none;
                border: none;
                font-size: 18px;
                ::placeholder {
                    font-family: 'Tahoma', Arial, Helvetica, sans-serif;
                }
                &:focus {
                    outline: none;
                }
            }
        }
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
            .spinner {
                margin: 10px;
            }
            .imgBox {
                position: relative;
                flex: 0 0 100%;
                &:not(:last-child) {
                    margin-right: 10px;
                }
                &:hover {
                    span {
                        transition: .1s ease-in-out;
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
                    width: 100%;
                    height: 130px;
                    object-fit: cover;
                    border-radius: var(--br);
                    box-shadow: 0 0 5px 1px rgb(0 0 0 / 5%);
                }
            }
        }
        .formOptions {
            padding: 10px 0 0 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .options {
                display: flex;
                .upload {
                    margin-right: 15px;
                    label {
                        span {
                            min-width: 0;
                            padding: 5px 0;
                            font-size: 15px;
                            color: var(--mainColor);
                        }
                    }
                }
                .addEmoji {
                    button {
                        min-width: 0;
                        padding: 5px 0;
                    }
                    span {
                        padding: 5px 0;
                        font-size: 15px;
                        color: var(--mainColor);
                    }
                    .EmojiPicker {
                        position: absolute;
                        z-index: 199;
                        left: 100px;
                    }
                }
            }
        }
    }
`;

export const TweetaList = styled.div`
    padding-bottom: 20px;
`;

export const SingleTweeta = styled.div`
    &:not(:last-child) {
        border-bottom: 10px solid var(--grayColor);
    }
    padding: var(--paddingLeftRight);
    display: flex;
    &:hover {
        background: #f5f5f6;
    }
    .userPhoto {
        padding-right: 15px;
        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }
    .tweetaWrapper { 
        flex: 1; 
        .tweetaHeader {
            display: flex;
            justify-content: space-between;
            .userInfo {
                display: flex;
                flex-wrap: wrap;
                h4 {
                    margin: 0 5px 0 0;
                    a {
                        text-decoration: none;
                        color: #000;
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
                span {
                    font-size: 15px;
                }
                span:nth-of-type(1) {
                    margin-right: 5px;
                    font-size: 15px;
                    a {
                        text-decoration: none;
                        color: #797979;
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
                span:nth-of-type(2) {
                    color: #797979;
                }
            }
            .tweetaOption {
                button {
                    ${customMUIButton};
                    padding: 5px 0;
                }
                .optionsMenu {
                    svg {
                        margin-right: 10px !important;
                    }
                    span {
                        color: red !important;
                    }
                }
            }
        }
        a {
            text-decoration: none;
            color: #000;
        }
        .tweetaContent {
            padding: 20px 0;
            span {
                line-height: 1.72;
            }
            .tweetaImgs {
                display: flex;
                overflow: auto;
                margin-top: 10px;
                .modalImg {
                    position: relative;
                    flex: 0 0 100%;
                }
                ::-webkit-scrollbar {
                    height: 5px;
                    border-radius: 10px;
                    background-color: #ddd;
                }
                ::-webkit-scrollbar-thumb {
                    background-color: #666;
                    border-radius: 10px;
                }
                img {
                    object-fit: cover;
                    border-radius: 3px;
                    width: 100%;
                    height: 250px;
                    cursor: pointer;
                }
            }
        }
        .tweetaFooter {
            display: flex;
            justify-content: space-between;
            button {
                ${customMUIButton};
                span {
                    color: #000;
                }
                .loved {
                    color: #f02727;
                    animation: bounce .45s ease;
                }
            }
            @keyframes bounce {
                0% {
                    transform: scale(0);
                }
                70% {
                    transform: scale(5);
                    opacity: .5;
                }
                100% {
                    transform: scale(1);
                }
            }
        }
    }
`;