import React, {Component} from 'react';
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

export default class ItemDetails extends Component {
    state = {
        char: null,
        loading: true,
        error: false
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

    updateChar() {
        this.setState({ 
            loading: true,
            error: false
        })

        const {charId, getData} = this.props;
        if (!charId) {
            return;
        }
        
        getData(charId)    
            .then(this.onCharLoaded)
            .catch(this.onError);             
    }

    componentDidMount() {
        this.updateChar(); 
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        if (!this.state.char) {
            return <SelectErrorStyle>Please select a character</SelectErrorStyle>
        }
        
        const {char, loading, error} = this.state;        
        const errorMessage = error ?  <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char} props={this.props}/> : null;
       
        return (
            <ItemDetailsStyle>
                {errorMessage}
                {spinner}
                {content}     
            </ItemDetailsStyle>
        );
    }
}

const View = ({char,props}) => {
    
    const {name} = char;
    
    return (
        <>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(props.children, (child) => {
                        return React.cloneElement(child, {char})
                    })
                }
            </ul>
        </>
    )
}