import styled from "styled-components";

const activeBorder = (border, opponent) => {
    const borderStyles = `
        border: 8px rgba(0,0,0,0.4) double;
        border-radius: 10px;
    `;
    if(opponent){
        if(border === false) return borderStyles;
    } 
    else if(border) return borderStyles;
    else return '';
}
   
export const StyleHand = styled.ul`
    width: 80vw;
    height: 29vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    list-style-type: none;
    padding: 8px 0 ;
    ${props => activeBorder(props.currentMove, props.opponent)}
    li {
        width: auto;
        height: auto;  
        &#${ props =>  props.id_card }{
            opacity: 0.4;
        }
        
    }
`;