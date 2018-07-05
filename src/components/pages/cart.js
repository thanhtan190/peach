import React from 'react';
import {connect} from 'react-redux';
import {Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart} from '../../actions/cartActions';

class Cart extends React.Component {

    onDelete(_id) {
        const currentBookToDelete = this.props.cart;
        const indexToDelete = currentBookToDelete.findIndex(function(cart){
            return cart._id === _id;
        });
        let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete),...currentBookToDelete.slice(indexToDelete+1)];

        this.props.deleteCartItem(cartAfterDelete);
    }

    onIncrement(_id){
        this.props.updateCart(_id, 1);
    }
    
    onDecrement(_id, quantity){
        if (quantity > 1) {
            this.props.updateCart(_id, -1);
        }
    }

    render(){
        if (this.props.cart[0]) {
            return this.renderCart();
        } else {
            return this.renderEmpty();
        }
    }

    renderEmpty(){
        return (<div></div>);
    }
    
    renderCart(){
        const cartItemsList = this.props.cart.map(cartArr => {
            return (
                <Panel key={cartArr._id}>
                    <Panel.Body>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cartArr.title}</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>usd. {cartArr.price}</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>qty. <Label bsStyle="success">{cartArr.quantity}</Label></h6>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup style={{minWidth: '300px'}}>
                                <Button bsStyle="default" bsSize="small" onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)}>-</Button>
                                <Button bsStyle="default" bsSize="small" onClick={this.onIncrement.bind(this, cartArr._id)}>+</Button>
                                <Button bsStyle="danger" onClick={this.onDelete.bind(this, cartArr._id)} bsSize="small">DELETE</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    </Panel.Body>
                </Panel>
            )
        }, this)

        return (
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Cart</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    {cartItemsList}
                </Panel.Body>
            </Panel>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteCartItem: deleteCartItem,
        updateCart: updateCart
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);