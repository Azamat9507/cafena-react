import { Box, Button, Container, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import '../css/App.css';
import '../css/navbar.css';
import '../css/footer.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { CommunityPage } from './screens/CommunityPage';
import { HelpPage } from './screens/HelpPage';
import { LoginPage } from './screens/LoginPage';
import { MemberPage } from './screens/MemberPage';
import { OrdersPage } from './screens/OrdersPage';
import { RestaurantPage } from './screens/RestaurantPage';
import { Homepage } from './screens/Homepage';
import { NavbarHome } from './components/header';
import { NavbarRestaurant } from './components/header/restaurant';
import { NavbarOthers } from './components/header/others';
import { Footer } from './components/footer';
import Car from './screens/testCar';
import AuthenticationModal from './components/auth';

function App() {
    /** INTIALIZATIONS */
  const [path, setPath] = useState();
  const main_path = window.location.pathname;
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  //** HANDLERS */
  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  return (
    <Router>
      {main_path == "/" ? (
        <NavbarHome 
          setPath={setPath} 
          handleLoginOpen={handleLoginOpen}
          handleSignUpOpen={handleSignUpOpen}
        /> 
      ) : main_path.includes("/restaurant") ? (
        <NavbarRestaurant 
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleSignUpOpen={handleSignUpOpen} 
        />
      ) : (
        <NavbarOthers 
          setPath={setPath} 
          handleLoginOpen={handleLoginOpen}
          handleSignUpOpen={handleSignUpOpen}
        />
      )}

        <Switch>
          <Route path="/restaurant">
            <RestaurantPage />
          </Route>
          <Route path="/community">
            <CommunityPage />
          </Route>
          <Route path="/orders">
            <OrdersPage />
          </Route>
          <Route path="/member-page">
            <MemberPage />
          </Route>
          <Route path="/help">
            <HelpPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>

        <Footer />

        <AuthenticationModal 
          loginOpen={loginOpen}
          handleLoginOpen={handleLoginOpen}
          handleLoginClose={handleLoginClose}
          signUpOpen={signUpOpen}
          handleSignUpOpen={handleSignUpOpen}
          handleSignUpClose={handleSignUpClose}
        />
    </Router>
  );
}

export default App;



// function Home() {
//   return <h2>Home</h2>
// }

