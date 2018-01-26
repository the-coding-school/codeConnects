import React, { Component } from 'react';
import './PagePreviewBoxHeader.scss';
export default class PagePreviewBoxHeader extends Component {
  render(){
    return (<h2 className="PagePreviewBoxHeader">{this.props.children}</h2>);
  }
}
