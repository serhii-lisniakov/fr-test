import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { registerAction } from '../../store/user/actions';
import { Body, Title, Input, Button, Reg } from '../Login/Login'
import firebase from "firebase/app";
import "firebase/auth";


const RegisterBody = styled(Body)`
    padding: 110px 70px 30px;
    @media (max-width: 525px) {
        padding-top: 60px;
    }
    @media (max-width: 375px) {
        padding: 60px 20px 25px;
    }
`

export const Register = (props) => {
    const [firstName, setFirstName] = useState('Serhii')
    const [lastName, setLastName] = useState('Lisniakov')
    const [email, setEmail] = useState('serhiy.lisnyakov@gmail.com')
    const [password, setPassword] = useState('12345678')

    const dispatch = useDispatch()
    
    const register = e => {
        e.preventDefault()

        const newUser = {
            name: firstName + ' ' + lastName,
            email,
            password,
            desktopTimer: 0,
            mobileTimer: 0
        }

        dispatch(registerAction(newUser))

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) props.history.push('/timers')
            else setPassword('')
        });
    }

    return (
        <RegisterBody onSubmit={e => register(e)}>
            <Title>Register</Title>
            <Input
                type='text'
                placeholder='First name'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
            />
            <Input
                type='text'
                placeholder='Last name'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
            />
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
            <Button type='submit'>Sign Up</Button>
            <Reg to='/login'>Don’t have an account yet? <span>Log In</span></Reg>
        </RegisterBody>
    )
}