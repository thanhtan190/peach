"use strict"
import React from 'react';
import {Image, Row, Col, Well, Button} from "react-bootstrap";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart} from '../../actions/cartActions';

class BookItem extends React.Component{

    constructor() {
        super();
        this.state = {
            isClicked: false
        }
    }

    handleCart(){
        const book = [...this.props.cart, {
            _id: this.props._id,
            title: this.props.title,
            description: this.props.description,
            images: this.props.images,
            price: this.props.price,
            quantity: 1
        }];
        // check if cart is empty
        if (this.props.cart.length > 0) {
            // cart not empty
            let _id = this.props._id;
            let cartIndex = this.props.cart.findIndex(cart=>{
                return cart._id === _id;
            });
            // there are no items with same id
            if (cartIndex === -1) {
                // just add card item
                this.props.addToCart(book);
            } else {
                // update quantity cart item
                this.props.updateCart(_id, 1, this.props.cart);
            }
        } else {
            // cart empty
            this.props.addToCart(book);
        }
    }

    onReadMore() {
        this.setState({isClicked: true})
    }

    render(){
        return (
            <Well>
                <Row>
                    <Col xs={6} sm={4}>
                        <Image src={this.props.images} responsive />
                    </Col>
                    <Col xs={6}>
                        <h6>{this.props.title}</h6>
                        <p>{(this.props.description.length > 50 && this.state.isClicked === false) ? (this.props.description.substring(0, 50)) : (this.props.description)}
                            <button className='link' onClick={this.onReadMore.bind(this)}>
                                {(this.state.isClicked === false && this.props.description !== null && this.props.description.length > 50) ? ('...read more') : ("")}
                            </button>
                        </p>
                        <h6>usd. {this.props.price}</h6>
                        <Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy now</Button>
                    </Col>
                </Row>
            </Well>
        )
    }
}

function mapStateToProps(state){
    return {
        cart: state.cart.cart
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addToCart: addToCart,
        updateCart: updateCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);