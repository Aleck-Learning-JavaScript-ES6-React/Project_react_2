import React, {useState, useEffect} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const ItemListStyle=styled(ListGroup)`
    cursor: pointer;
`;

const ListGroupItemStyle=styled(ListGroupItem)`
    cursor: pointer;
`;

export default function ItemList({getData, onItemSelected, renderItem}) {
    const [itemList, updateList] = useState([]);
    const [error, errorStatus] = useState(false);
    
    const onitemListLoaded = (itemList) => {
        updateList(itemList)
        errorStatus(false)
    }
    
    const onError = () => {
       errorStatus(true)
    }

    useEffect(() => {
        getData()
            .then(onitemListLoaded)
            .catch(onError);    
    }, [getData])

    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item);
            
            return (
                <ListGroupItemStyle key={id}
                onClick={() => onItemSelected(id)}>
                    {label}
                </ListGroupItemStyle>        
            )
        })
    }
       
    if (error) {
        return <ErrorMessage/>
    }
        if (!itemList) {
            return <Spinner/>
        }

    const content = renderItems(itemList);

    return (
        <ItemListStyle>
            {content} 
        </ItemListStyle>
    );
   
}