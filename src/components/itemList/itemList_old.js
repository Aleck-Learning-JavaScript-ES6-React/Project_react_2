import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import PropTypes from 'prop-types';

const ItemListStyle=styled(ListGroup)`
    cursor: pointer;
`;

const ListGroupItemStyle=styled(ListGroupItem)`
    cursor: pointer;
`;

export default class ItemList extends Component {
   
    state = {
        itemList: null,
        error: false
    }

    onitemListLoaded = (itemList) => {
        this.setState({
            itemList,
            error: false
        });
    }
    
    onError = (err) => {
        this.setState({
            error: true
        })
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then(this.onitemListLoaded)
            .catch(this.onError);
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);
            
            return (
                <ListGroupItemStyle key={id}
                onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </ListGroupItemStyle>        
            )
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        const {itemList, error} = this.state;
        
        if (error) {
            return <ErrorMessage/>
        }
         if (!itemList) {
             return <Spinner/>
         }

        const content = this.renderItems(itemList);

        return (
            <ItemListStyle>
                {content} 
            </ItemListStyle>
        );
    }
}

ItemList.defaultProps = {
    onItemSelected: () => {}
}

ItemList.propTypes = {
        onItemSelected: PropTypes.func
}