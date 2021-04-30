import styled from 'styled-components';

export const TweetForm = styled.form`
    padding: 10px var(--paddingLeftRight);
    border-bottom: 10px solid var(--grayColor);
    display: flex;
    max-height: 300px;
    position: relative;
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
                    label {
                        span {
                            min-width: 0;
                            padding: 0;
                            font-size: 15px;
                        }
                    }
                }
                .addEmoji {
                    margin-left: 15px;
                    span {
                        font-size: 15px;
                        vertical-align: middle;
                        cursor: pointer;
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