import gql from "graphql-tag";

// export const GET_PRODUCTS = gql`
// 	query getProducts($limit: Int) {
// 		products(limit: $limit) {
// 			id
// 			title
// 			thumbnail
// 		}
// 	}
// `;

export const GET_PRODUCTS = gql`
  query getProducts($limit: Int) {
    products(limit: $limit) {
      id
      title
      thumbnail
    }
  }
`;

export const GET_CART = gql`
	query getCart {
		cart {
			total
			products {
				id
				title
				thumbnail
			}
		}
	}
`;

export const GET_CART_TOTAL = gql`
	query getCartTotal {
		cart {
			total
		}
	}
`;

export const ADD_TO_CART = gql`
	mutation addToCart ($productId: Int!) {
		addToCart(input: { productId: $productId }) {
			total
		}
	}
`;

export const GET_LIMIT = gql`
	query getLimit {
		limit @client
	}
`;