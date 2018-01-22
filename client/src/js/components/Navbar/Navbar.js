import React, {Component} from 'react';
import {Link} from 'react-router-dom';
export default class Navbar extends React.Component {
  render(){
    return(
  <nav>
      <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/About">About Us</Link></li>
          <li><Link to="/Team">Our Team</Link></li>
          <li><Link to="/Impact">Our Impact</Link></li>
          <li><Link to="/codeConnects">codeConnects</Link></li>
          <li><Link to="/signUp">Sign Up</Link></li>
          <li><Link to="/getInvolved">Get Involved</Link></li>
      </ul>
  </nav>
);
}
}
