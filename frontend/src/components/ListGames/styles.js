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
        font-size: 1.2em;
        justify-content: center;
        align-items: center;
        button {
            font-size: 1em;
        }
    }
`;