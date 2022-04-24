import styled from 'styled-components';

export const ListGamesStyle = styled.ul`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 25px 0;
    li {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
            color: #54595F;
            font-size: 20px;
            span {
                color: rgba(0,0,0, 0.6);
            }
            .name-game {
                color: #54595F;
                font-size: 1.5em;
                &:hover {
                    text-decoration: underline;
                }
            }
            .name-user {
                font-size: 0.9em;
            }
        }
        button {
            font-size: 1em;
        }
    }
`;