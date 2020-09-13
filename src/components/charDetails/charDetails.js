import React, {Component} from 'react';
import styled from 'styled-components';

const CharDetailsStyle = styled.div`
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

export default class CharDetails extends Component {

    render() {
        return (
            <CharDetailsStyle>
                <h4>John Snow</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <TermStyle>Gender</TermStyle>
                        <span>male</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <TermStyle>Born</TermStyle>
                        <span>1783</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <TermStyle>Died</TermStyle>
                        <span>1820</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <TermStyle>Culture</TermStyle>
                        <span>First</span>
                    </li>
                </ul>
            </CharDetailsStyle>
        );
    }
}