import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {Route, Switch} from 'react-router-dom';
import Header from './Header/Header';
import {ApolloProvider} from "react-apollo";
import ProductsApollo from "./Products/ProductsApollo";
import ApolloClient from "apollo-client";
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import CartApollo from "./Cart/CartApollo";

const cache = new InMemoryCache();
cache.writeData({
	data: {
		limit: 5,
	},
});

const client = new ApolloClient({
	link: new HttpLink({
		uri: 'http://211.232.166.235:4000/graphql',
	}),
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

				<Route exact path='/' component={ProductsApollo}/>
				<Route path='/cart' component={CartApollo}/>
			</Switch>
		</AppWrapper>
	</ApolloProvider>
);

export default App;
