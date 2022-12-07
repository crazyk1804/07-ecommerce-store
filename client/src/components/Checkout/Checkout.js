import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import {COMPLETE_CART} from "../../constants";
import {useMutation} from "react-apollo";

const CheckoutWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const Checkout = () => {
    const [completeCart, { data }] = useMutation(COMPLETE_CART);

    return (
        <CheckoutWrapper>
            { data && data.completeCart.complete ? (
                <p>Complete checkout!</p>
            ): (<>
                <p>This is the checkout, press the button below to complete:</p>
                <Button onClick={completeCart}>Complete checkout</Button>
            </>)}
        </CheckoutWrapper>
    );
};

export default Checkout;
