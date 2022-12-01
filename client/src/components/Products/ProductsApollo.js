import React from 'react';
import styled from 'styled-components';
import {Query} from 'react-apollo';
import SubHeader from '../Header/SubHeader';
import ProductItem from './ProductItem';
import gql from "graphql-tag";
import {LoadingOrError} from "../CMM/LoadingOrError";
import {GET_PRODUCTS} from "../../constants";

const ProductItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 2% 5%;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const ProductsApollo = ({history}) => (
	<>
		{history && (
			<SubHeader
				title='Available products'
				goToCart={() => history.push('/cart')}
			/>
		)}
		<Query query={GET_PRODUCTS}>
			{({ loading, error, data }) => {
				if(loading || error) return <LoadingOrError loading={loading} error={error}/>

				return (
					<ProductItemsWrapper>
						{data.products && data.products.map(product => (
							<ProductItem key={product.id} data={product}/>
						))}
					</ProductItemsWrapper>
				);
			}}
		</Query>
	</>
);

export default ProductsApollo;