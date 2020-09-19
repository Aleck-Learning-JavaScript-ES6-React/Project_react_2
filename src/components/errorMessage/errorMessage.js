import React from 'react';
import styled from 'styled-components';

const ImgStyle = styled.img`
    display: block; 
    height: 100px;  
    margin-left: auto;
    margin-right: auto;
`;

const SpanStyle = styled.span`
    color: red;
`;

const ErrorMessage = () => {
    return (
        <>
            <ImgStyle src={process.env.PUBLIC_URL + '/img/error.png'} alt='error'></ImgStyle>
            <SpanStyle>Something goes wrong</SpanStyle>
        </>    
    )
}

export default ErrorMessage;