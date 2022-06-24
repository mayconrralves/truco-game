import styled from "styled-components";

export const StyleHand = styled.ul`
    width: 80vw;
    height: 25vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    list-style-type: none;
    padding: 8px 0 ;
    li {
        width: auto;
        height: auto;  
        &#${ props =>  props.id_card }{
            opacity: 0.4;
        }
        
    }
`;