import React, {Component} from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import PropTypes from 'prop-types';

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

export default class RandomChar extends Component {
    gotService = new gotService();
    state = {
        char: {},
        loading: true,
        error: false
    }

    static defaultProps = {
        interval: 10000
    }

    static propTypes = {
        interval: PropTypes.number
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        });
    }
    
    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar = () => {
        const id=Math.floor(Math.random()*2001+20); //20-2020
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    componentDidMount() {
        this.updateChar();
        this.timerID = setInterval(this.updateChar,this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        const {char, loading, error} = this.state;
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