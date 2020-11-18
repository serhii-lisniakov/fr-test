import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { loginAction } from '../../store/user/actions';
import firebase from "firebase/app";
import "firebase/auth";


export const Body = styled.form`
    width: 100%;
    max-width: 588px;
    background: #C4C4C4;
    border-radius: 57px;
    color: #000;
    padding: 110px 70px 30px;
    text-align: center;
    @media (max-width: 525px) {
        padding: 80px 50px 25px;
        height: calc(100vh - 100px);
    }
    @media (max-width: 375px) {
        padding: 80px 20px 25px;
    }
`
export const Title = styled.p`
    font-weight: 500;
    font-size: 46px;
    line-height: 54px;
    letter-spacing: 0.0075em;
    text-align: center;
`
export const Input = styled.input`
    width: 100%;
    border: none;
    background: none;
    font-size: 40px;
    margin-top: 30px;
    @media (max-width: 525px) {
        font-size: 24px;
    }
`
export const Button = styled.button`
    background: #828282;
    border-radius: 63px;
    font-size: 40px;
    border: none;
    width: 277px;
    height: 73px;
    margin: 80px auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:active {
        background: #a5a5a5;
    }
    @media (max-width: 525px) {
        width: 195px;
        height: 47px;
        font-size: 24px;
    }
`
export const Reg = styled(Link)`
    color: #88888C;
    letter-spacing: 0.75px;
    display: inline-block;
    margin-top: 20px !important;
    font-size: 20px;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background: #88888C;
        top: 100%;
        left: 0;
    }
    @media (max-width: 525px) {
        font-size: 15px;
    }
    span {
        font-weight: bold;
        color: #000;
        position: relative;
        &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            background: #000;
            top: 100%;
            left: 0;
            z-index: 2;
        }
    }
`

export const Login = (props) => {
    const [email, setEmail] = useState('serhiy.lisnyakov@gmail.com')
    const [password, setPassword] = useState('12345678')

    const dispatch = useDispatch()

    const login = e => {
        e.preventDefault()

        const newUser = {
            email,
            password,
        }

        dispatch(loginAction(newUser))
        
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) props.history.push('/timers')
            else setPassword('')
        });
    }

    return (
        <Body onSubmit={e => login(e)}>
            <Title>Login</Title>
            <Input
                type='text'
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <Input
                type='password'
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button type='submit'>Login</Button>
            <Reg to='/register'>Don’t have an account yet? <span>Register</span></Reg>
        </Body>
    )
}