import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const ItemDetailsStyle = styled.div`
    border-radius: 5px;
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;
// eslint-disable-next-line
const SelectErrorStyle = styled.div`
    color: #fff;
    text-align: center;
    font-size: 26px;
`;

const TermStyle=styled.span`
    font-weight: bold;
`;

const Field = ({char, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <TermStyle>{label}</TermStyle>
            <span>{char[field]}</span>
        </li>
    )
};
export {Field};

export default function ItemDetails({charId, getData, children}) {
    console.log(children);
    const [char, updateChar] = useState([]);
    const [loading, loadingStatus] = useState(true);
    const [error, errorStatus] = useState(false);
    
    const onCharLoaded = (char) => {
        updateChar(char)
        loadingStatus(false)
        errorStatus(false)
    }
    
    const onError = (err) => {
        loadingStatus(false)
        errorStatus(true)
    }

    useEffect(() => {
        loadingStatus(true)
        errorStatus(false)
        
        if (!charId) {
            return;
        }
        
        getData(charId)    
        .then(onCharLoaded)
        .catch(onError);
    },[charId, getData])
    
    function render() {
       
        if (!char || char.length===0) {
            return <SelectErrorStyle>Please select a character</SelectErrorStyle>
        }
        
        const errorMessage = error ?  <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char} children={children}/> : null;
       
        return (
            <ItemDetailsStyle>
                {errorMessage}
                {spinner}
                {content}     
            </ItemDetailsStyle>
        );
    }

    return render();
}

const View = ({char,children}) => {
    
    const {name} = char;
    
    return (
        <>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {char})
                    })
                }
            </ul>
        </>
    )
}