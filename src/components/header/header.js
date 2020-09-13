import React from 'react';
import styled from 'styled-components';

const HeaderBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
`;

const HeaderTitle = styled.h3`
    font-size: 24px;
    color: #fff;
    margin: 0;
`;

const HeaderLinks = styled.ul`
    display: flex;
    margin: 0;
    align-items: center;
    color: #fff;
    list-style-type: none;
    li {
        margin-right: 20px;
        font-size: 18px;
    }
`;

const LinkStyle=styled.a`
    color: inherit;
    text-decoration: none;
    :visited {
        text-decoration: none;
        color: inherit;
    }
    :hover {
        text-decoration: none;
        color: inherit;
    }
    :focus {
        text-decoration: none;
        color: inherit;
    }
    :active {
        text-decoration: none;
        color: inherit;
    }
`;

const Header = () => {
    return (
        <HeaderBlock>
            <HeaderTitle>
                <LinkStyle href="#">
                Game of Thrones DB
                </LinkStyle>
            </HeaderTitle>
            <HeaderLinks>
                <li>
                    <LinkStyle href="#">Characters</LinkStyle>
                </li>
                <li>
                    <LinkStyle href="#">Houses</LinkStyle>
                </li>
                <li>
                    <LinkStyle href="#">Books</LinkStyle>   
                </li>
            </HeaderLinks>
        </HeaderBlock>
    );
};

export default Header;