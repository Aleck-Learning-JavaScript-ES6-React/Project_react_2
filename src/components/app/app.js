import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';

export default class App extends Component {
    state = { 
        visibleRandomChar: true
    }

    onToggle = () => {
        this.setState((state) => {
            return {
                visibleRandomChar: !state.visibleRandomChar
            }    
        })
    }

    render () {
        const content = this.state.visibleRandomChar ? <RandomChar/> : null;
        return (
            <> 
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
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }

}