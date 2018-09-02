import React from 'react';
import {connect} from 'react-redux';
import {Panel, Col, Row, Well, Button, ButtonGroup, Label, Modal} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart} from '../../actions/cartActions';

class Cart extends React.Component {

    constructor(){
        super();
        this.state = {
            showModal: false
        }
    }

    open() {
        this.setState({
            showModal: true
        });
    }

    close() {
        this.setState({
            showModal: false
        });
    }

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
                            <h6>usd. {cartArr.quantity * cartArr.price}$</h6>
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
                    <Row>
                        <Col xs={12}>
                        <h6>Total amount: {this.props.totalAmount}</h6>
                        <Button bsStyle="success" onClick={this.open.bind(this)} bsSize="small">
                            PROCESS CHECKOUT
                        </Button>
                        </Col>
                    </Row>
                    <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thank you!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h6>Your order has been saved</h6>
                            <p>You will receive an email confirmation!</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Col xs={6}>
                                Total {this.props.totalAmount}$
                            </Col>
                            <Button onClick={this.close.bind(this)}>Close</Button>
                        </Modal.Footer>
                        </Modal>
                </Panel.Body>
            </Panel>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteCartItem: deleteCartItem,
        updateCart: updateCart
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);