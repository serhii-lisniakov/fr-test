import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { updateTimersAction } from '../../store/user/actions'
import firebase from "firebase/app";
import "firebase/database";
import clock from '../../assets/clock.svg'
import { Header } from './Header';

const TimersContainer = styled.div`
    display: flex;
    justify-content: space-between;
    @media (max-width: 575px) {
        flex-direction: column;
    }
`
const TimerWrapper = styled.div`
    text-align: center;
    font-size: 40px;
    &:first-child {
        margin-right: 200px;
        @media (max-width: 1024px) {
            margin-right: 100px;
        }
        @media (max-width: 575px) {
            margin-right: 0px;
            margin-bottom: 20px;
        }
    }
    @media (max-width: 1024px) {
        font-size: 24px;
    }
    
`
const Timer = styled.div`
    width: 379px;
    height: 404px;
    border-radius: 25px;
    margin-top: 15px;
    margin-bottom: 15px;
    background: url(${clock}) center center no-repeat, #C4C4C4;
    background-size: 50%;
    @media (max-width: 1024px) {
        width: 192px;
        height: 208px;
    }
`

export const Timers = (props) => {
    const user = useSelector(state => state.user)
    console.log(user);
    const [desktopTime, setDesktopTime] = useState(user.desktopTimer || 0)
    const [mobileTime, setMobileTime] = useState(user.mobileTimer || 0)

    const dispatch = useDispatch()

    const msToHMinSec = (ms) => {
        let sec = parseInt((ms / 1000) % 60),
            min = parseInt((ms / (1000 * 60)) % 60),
            h   = parseInt((ms / (1000 * 60 * 60)) % 24);
    
        h   = (h < 10)   ? '0' + h : h;
        min = (min < 10) ? '0' + min : min;
        sec = (sec < 10) ? '0' + sec : sec;

        return h + ':' + min + ':' + sec;
    }

    // useEffect(() => {
    //     const userId = firebase.auth().currentUser.uid;
        
    //     firebase.database().ref('users/' + userId).once('value').then(function(snapshot) {
    //         setDesktopTime((snapshot.val() && snapshot.val().desktopTimer) || 0)
    //         setMobileTime((snapshot.val() && snapshot.val().mobileTimer) || 0)
    //       })
    // }, [])

    useEffect(() => {
        const timers = {
            desktopTime,
            mobileTime
        }
        if (window.innerWidth < 525) {
            setTimeout(() => setMobileTime(prev => prev + 1000), 1000)
            dispatch(updateTimersAction(timers))
        }
        else   {
            setTimeout(() => setDesktopTime(prev => prev + 1000), 1000)
            dispatch(updateTimersAction(timers))
        }
    }, [desktopTime, mobileTime])

    return (
        <>
            <Header props={props}/>
            <TimersContainer>
                <TimerWrapper>
                    Desktop
                    <Timer/>
                    <span>{msToHMinSec(desktopTime)}</span>
                </TimerWrapper>
                <TimerWrapper>
                    Mobile
                    <Timer/>
                    <span>{msToHMinSec(mobileTime)}</span>
                </TimerWrapper>
            </TimersContainer>
        </>
    )
}