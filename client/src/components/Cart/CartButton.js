import React from 'react';
import Button from '../Button/Button';
import {Query} from 'react-apollo';
import gql from "graphql-tag";
import {GET_CART_TOTAL} from "../../constants";

const CartButton = ({onClick}) => (
	<Query query={GET_CART_TOTAL}>
		{({loading, error, data}) => (
			<Button onClick={onClick}>
				{`Cart (${(loading || error) ? 0 : data.cart.total})`}
			</Button>
		)}
	</Query>
);

export default CartButton;
