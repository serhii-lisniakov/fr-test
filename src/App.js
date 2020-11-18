import React from 'react'
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Login } from '../src/Components/Login/Login'
import { Timers } from './Components/Timers/Timers';
import { Register } from './Components/Register/Register';


const Container = styled.div`
  max-width: 1440px;
  padding: 0 15px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const App = () => (
  <Container>
    <Router basename={'/fr-test'}>
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/timers' component={Timers} />
      <Route exact path='/' render={() => <Redirect to="/login"/>} />
    </Router>
  </Container>
)

export default App;
