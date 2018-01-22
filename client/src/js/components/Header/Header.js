import React, { Component } from 'react';
import Logo from 'Components/Logo';
import "./Header.scss";
export default class Header extends React.Component{
  render()
    {
    return (
    <div className="HeaderContainer">
      <Logo></Logo>
        <div className="HeaderButtonsContainer">
        <button className="HeaderButton HeaderButtonLogin">Log in</button>
        <button className="HeaderButton HeaderButtonDonate">Donate</button>
        </div>
    </div>
    );
  }
}
