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
    div {
        cursor: pointer;
        margin-left: auto;
    }
    @media (max-width: 525px) {
        flex-direction: column;
        align-items: center;
        padding-top: 20px;
    }
`

export const Header = ({props}) => {
    
    const logout = () => {
        logoutAction()
        props.history.push('/login')
    }

    return (
        <HeaderWrapper>
            <div onClick={logout}>Log out</div>
        </HeaderWrapper>
    )
}