import React from 'react';
import Button from "../Button/Button";
import {ADD_TO_CART, GET_CART, GET_CART_TOTAL} from "../../constants";
import { Mutation } from 'react-apollo';

export const AddToCartButton = ({ productId }: { productId: number }) => (
	<Mutation mutation={ADD_TO_CART} refetchQueries={[
		{ query: GET_CART }, { query: GET_CART_TOTAL }
	]}>
		{(addToCart: Function) => (
			<Button onClick={() => {
				console.log('add to cart #' + productId);
				addToCart({variables: {productId}})
			}}>
				+ Add to cart
			</Button>
		)}
	</Mutation>
);