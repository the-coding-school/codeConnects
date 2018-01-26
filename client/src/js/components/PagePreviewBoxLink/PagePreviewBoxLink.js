import React, { Component } from 'react';
import {Link} from 'react-router-dom';


import './PagePreviewBoxLink.scss'
export default class PagePreviewBoxLink extends Component {
  render(){
    const {to} = this.props
    return (
      <div className="PagePreviewBoxLinkContainer">
      <Link className="PagePreviewBoxLinkBody" to={to}>Learn more</Link>
      </div>);
  }
}
