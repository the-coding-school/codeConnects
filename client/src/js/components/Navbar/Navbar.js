import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import NavbarItem from 'Components/NavbarItem'

import './Navbar.scss'
export default class Navbar extends React.Component {
  render(){
    return(
      <div className="NavbarContainer">
          <NavbarItem to="/">Home</NavbarItem>
          <NavbarItem to="/About">About Us</NavbarItem >
          <NavbarItem to="/Team">Our Team</NavbarItem >
          <NavbarItem to="/Impact">Our Impact</NavbarItem >
          <NavbarItem to="/codeConnects">codeConnects</NavbarItem >
          <NavbarItem to="/signUp">Sign Up</NavbarItem >
          <NavbarItem to="/getInvolved">Get Involved</NavbarItem >
  </div>
);
  }
}
