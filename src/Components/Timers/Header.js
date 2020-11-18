import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { logoutAction } from '../../store/user/actions'

const HeaderWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 50px 45px 0;
    font-size: 24px;
    font-weight: 500;
    div:last-child {
        cursor: pointer;
    }
    @media (max-width: 525px) {
        flex-direction: column;
        align-items: center;
        padding-top: 20px;
        div:last-child {
            margin-top: 10px;
        }
    }
`


export const Header = ({props}) => {
    
    const logout = () => {
        logoutAction()
        props.history.push('/login')
    }

    const username = useSelector(state => state.user.name)

    return (
        <HeaderWrapper>
            <div>Hello, {username}</div>
            <div onClick={logout}>Log out</div>
        </HeaderWrapper>
    )
}