import styled from 'styled-components';

export const ConfigGameStyle = styled.main`
    display: flex;
    width: 80%;
    min-height: 50vh;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    h2 {
        width: 100%;
        height: 40px;
        display: flex;
        font-size: 1.6em;
        color: white;
        justify-content: center;
        align-items: center;
        padding-left: 6px;
        border-radius: 8px;
        background: linear-gradient(rgba(93,124,147,1) 0%, rgba(0,82,139,1) 40%, rgba(0,82,139,1) 100% );
    }
    button {
        font-size: 1.2em;
        padding: 4px;
        width: 150px;
        height: 40px;
        margin-top: 20px;
    }
    .list-games {
        display: flex;
        width: 100%;
    }
`;