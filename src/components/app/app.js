import React, {Component} from 'react';
import {Col, Row, Container, Button, Badge} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage/errorMessage';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import styled from 'styled-components';
import CharactersPage from '../pages/charactersPage';
import BooksPage from '../pages/booksPage';
import HousesPage from '../pages/housesPage';
import BooksItem from '../pages/booksItem';

import gotImage from './got.jpeg'

const BodyStyle = styled.div`
    background: blue url(${gotImage}) center center no-repeat;
    background-size: cover;
    height: 1000px;
`;

function NoMatch() {
    return (
        <>
            <h1><Badge color="danger">This page is not exist!</Badge></h1>
            <Link to='/'>To the main page</Link>    
        </>
    )
}

export default class App extends Component {
    gotService = new gotService();

    state = { 
        visibleRandomChar: true,
        error: false
    }

    onToggle = () => {
        this.setState((state) => {
            return {
                visibleRandomChar: !state.visibleRandomChar
            }    
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render () {
        const content = this.state.visibleRandomChar ? <RandomChar /> : null;
        
        if (this.state.error) {
            return <ErrorMessage/>
        }
        
        return (
            <Router>
                <BodyStyle> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {content}
                                <Button color='primary'
                                onClick={this.onToggle}>Toggle random character</Button>
                                <br/><br/>
                            </Col>
                        </Row>
                        <Switch>
                            <Route path='/' exact component={() => <h1><Badge>Welcome to GOT DB</Badge></h1>} />
                            <Route path='/characters' component={CharactersPage}/>                        
                            <Route path='/houses' component={HousesPage}/>
                            <Route path='/books' exact component={BooksPage}/>
                            <Route path='/books/:id' render={
                                ({match}) => {
                                    const {id} = match.params;
                                return <BooksItem bookId={id} />} 
                            }/>
                            <Route path="*"><NoMatch /></Route>
                        </Switch>
                    </Container>
                </BodyStyle>
            </Router>
        )
    }

}