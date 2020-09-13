import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';

const ItemListStyle=styled(ListGroup)`
    cursor: pointer;
`;

const ListGroupItemStyle=styled(ListGroupItem)`
    cursor: pointer;
`;

export default class ItemList extends Component {

    render() {
        return (
            <ItemListStyle>
                <ListGroupItemStyle>
                    John Snow
                </ListGroupItemStyle>
                <ListGroupItemStyle>
                    Brandon Stark
                </ListGroupItemStyle>
                <ListGroupItemStyle>
                    Geremy
                </ListGroupItemStyle>
            </ItemListStyle>
        );
    }
}