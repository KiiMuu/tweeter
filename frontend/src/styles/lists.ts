import styled from 'styled-components';

export const Sider = styled.div`
    height: 100vh;
    border-right: 1px solid var(--borderColor);
    ul {
        margin: 0;
        padding: 20px 0 0 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        li {
            &:first-child {
                a {
                    color: var(--mainColor);
                    font-size: 35px;
                }
            }
            a, span {
                color: var(--darkColor);
                font-size: 30px;
            }
        }
    }
`;