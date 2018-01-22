import React, { Component } from 'react';

export default class PagePreviewBoxHeader extends Component {
  render(){
    return (<h4>{this.props.children}</h4>);
  }
}
