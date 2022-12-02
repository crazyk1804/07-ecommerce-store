import React from 'react';
import {ApolloConsumer} from 'react-apollo';

export const Filters = ({limit}: { limit: number }) => (
	<ApolloConsumer>
		{client => (<>
			<label htmlFor="limit">Number of products: </label>
			<select id="limit" onChange={e => {
				const target = e.target;
				client.writeData({ data: {limit: parseInt(e.target.value || '0')} });
			}}>{[5, 10, 20].map(n => <option key={`opt-${n}`} value={n}>{n}</option>)}</select>
		</>)}
	</ApolloConsumer>
)