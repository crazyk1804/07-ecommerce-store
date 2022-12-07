import React, {useState} from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import {LOGIN_USER} from "../../constants";
import {useMutation} from "react-apollo";
import {useHistory} from "react-router-dom";

const LoginWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 30%;
  margin: 2% auto;
`;

const TextInput = styled.input`
  padding: 18px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px;
  border: 1px solid #ccc;
  // background-color: #fff;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Login = () => {
    const history = useHistory();
    const [loginUser] = useMutation(LOGIN_USER);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    return (
        <LoginWrapper>
            <TextInput
                onChange={e => setUserName(e.target.value)}
                value={userName}
                placeholder='Your username (test)'
            />
            <TextInput
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder='Your password (test)'
            />
            <Button
                onClick={e => {
                    loginUser({variables: {userName, password}})
                        .then(({ data }) => {
                            if(!data.loginUser || !data.loginUser.token)
                                throw Error('no user or autenticated token');

                            sessionStorage.setItem('token', data.loginUser.token);
                            history.push('/checkout');
                        })
                        .catch(err => {
                            alert(err.message);
                        });
                }}
            >Login</Button>
        </LoginWrapper>
    );
};

export default Login;
