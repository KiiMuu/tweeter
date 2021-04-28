import styled from 'styled-components';

export const TweetForm = styled.form`
    padding: 10px var(--paddingLeftRight);
    border-bottom: 10px solid var(--grayColor);
    display: flex;
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
                font-family: 'Tahoma', Arial, Helvetica, sans-serif;
                &:focus {
                    outline: none;
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
                    span {
                        padding: 0;
                        font-size: 15px;
                    }
                }
            }
        }
    }
`;