import React, { Component } from 'react';
import Logo from 'Components/Logo'
import "./Footer.scss"
export default class Footer extends React.Component{
  render()
    {
      return (
            <div className="FooterContainer">
              <div className="FooterEmptyContainer"></div>
              <div className="FooterTextContainer">
                <Logo />
                <p className="FooterText"> Copyright 2017 </p>
              </div>
              <div className="FooterSocialMediaContainer">
                <p>SOCIAL MEDIA CIRCLES</p>
              </div>
            </div>
        );
  }
}
