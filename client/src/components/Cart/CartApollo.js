import React from 'react';
import styled from 'styled-components';
import SubHeader from '../Header/SubHeader';
import ProductItem from '../Products/ProductItem';
import Totals from './Totals';
import gql from "graphql-tag";
import {LoadingOrError} from "../CMM/LoadingOrError";
import { Query } from 'react-apollo';
import {GET_CART} from "../../constants";

const CartWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const CartItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const CartApollo = ({history}) => (
	<>
		{history && (
			<SubHeader title='Cart' goToCart={() => history.push('/cart')}/>
		)}
		<Query query={GET_CART}>
			{({loading, error, data}) => {
				if(loading || error) return <LoadingOrError loading={loading} error={error}/>;

				return (
					<CartWrapper>
						<CartItemsWrapper>
							{data.cart.products.map(product =>(
								<ProductItem key={product.id} data={product}/>
							))}
						</CartItemsWrapper>
					</CartWrapper>
				)
			}}
		</Query>
		{/*{!loading && !error ? (*/}
		{/*	<CartWrapper>*/}
		{/*		<CartItemsWrapper>*/}
		{/*			{cart.products &&*/}
		{/*			cart.products.map(product => (*/}
		{/*				<ProductItem key={product.id} data={product}/>*/}
		{/*			))}*/}
		{/*		</CartItemsWrapper>*/}
		{/*		<Totals count={cart.total}/>*/}
		{/*	</CartWrapper>*/}
		{/*) : (*/}
		{/*	<Alert>{loading ? 'Loading...' : error}</Alert>*/}
		{/*)}*/}
	</>
);

CartApollo.defaultProps = {
	loading: false,
	erorr: '',
	cart: {
		products: [],
		total: 0,
	},
};

export default CartApollo;
