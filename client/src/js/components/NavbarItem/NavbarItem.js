import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import "./NavbarItem.scss";

export default class NavbarItem extends React.Component {
  render(){
    const {to} = this.props
    return (
      <div className="NavbarItemContainer">
        <NavLink className="NavbarItemLink" to={to}>{this.props.children}</NavLink>
      </div>
    );
  }
}
