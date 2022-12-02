import React from 'react';
import styled from "styled-components";

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

export const LoadingOrError = ({loading, error}: {loading?: boolean, error?: Error}) => {
	console.log('loading', loading);
	console.log('error', error);
	return <Alert>{ loading ? 'Loading...' : error?.message }</Alert>;
}