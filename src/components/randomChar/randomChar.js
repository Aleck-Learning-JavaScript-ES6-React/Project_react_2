import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const RandomBlockStyle=styled.div`
    border-radius: 5px;
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;

const TermStyle=styled.span`
    font-weight: bold;
`;

export default function RandomChar()  {
    const getData = new gotService();
    
    const [char, updateList] = useState([]);
    const [loading, loadingStatus] = useState(true);
    const [error, errorStatus] = useState(false);

    const onCharLoaded = (char) => {
        updateList(char)
        loadingStatus(false)
        errorStatus(false)
    }
    
    const onError = (err) => {
        loadingStatus(false)
        errorStatus(true)
    }

    const updateChar = () => {
        const id=Math.floor(Math.random()*2001+20); //20-2020
        getData.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    }

    useEffect(() => {
        updateChar();
        const timerID = setInterval(updateChar,10000);   
        return () => {clearInterval(timerID)}; 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    function render() {
        
        const errorMessage = error ?  <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <RandomBlockStyle>
                {errorMessage}
                {spinner}
                {content}    
            </RandomBlockStyle>
        );
    }

    return render();    
}

const View = ({char}) => {
    const {name,gender,born,died,culture} = char;
    
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <TermStyle>Gender </TermStyle>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <TermStyle>Born </TermStyle>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <TermStyle>Died </TermStyle>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <TermStyle>Culture </TermStyle>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}