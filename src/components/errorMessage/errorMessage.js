import React from 'react';
import styled from 'styled-components';

const ImgStyle = styled.img`
    display: block;    
    width: 50%;
    margin-left: auto;
    margin-right: auto;
`;

const ErrorMessage = () => {
    return (
        <>
            <ImgStyle src={process.env.PUBLIC_URL + '/img/error.png'} alt='error'></ImgStyle>
            <span>Something goes wrong</span>
        </>    
    )
}

export default ErrorMessage;