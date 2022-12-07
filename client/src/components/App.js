import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {Redirect, Route, Switch} from 'react-router-dom';
import Header from './Header/Header';
import {ApolloProvider} from "react-apollo";
import ProductsApollo from "./Products/ProductsApollo";
import ApolloClient from "apollo-client";
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import CartApollo from "./Cart/CartApollo";
import Checkout from "./Checkout/Checkout";
import Login from "./Checkout/Login";
import {setContext} from "apollo-link-context";

const isAuthenticated = sessionStorage.getItem('token');
const cache = new InMemoryCache();
cache.writeData({
	data: {
		limit: 5,
	},
});

const httpLink = new HttpLink({
	uri: 'http://localhost:4000/graphql'
});

const authLink = setContext((_, { headers }) => {
	const token = isAuthenticated;
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		}
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache,
	resolvers: {},
	typeDefs: `
		extend type Query {
			limit: Int!
		}
	`,
});

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div`
  text-align: center;
`;

const App = () => (
	<ApolloProvider client={client}>
		<GlobalStyle/>
		<AppWrapper>
			<Header/>
			<Switch>
				{/*<Route exact path='/' component={Products}/>*/}
				{/*<Route path='/cart' component={Cart}/>*/}

				<Route path="/login"				component={Login}/>
				<Route exact path='/'				component={ProductsApollo}/>
				<Route path='/cart'					component={CartApollo}/>
				<Route path="/checkout" 			render={props => (
					isAuthenticated ? <Checkout/> : <Redirect to="/login"/>
				)}/>
			</Switch>
		</AppWrapper>
	</ApolloProvider>
);

export default App;
