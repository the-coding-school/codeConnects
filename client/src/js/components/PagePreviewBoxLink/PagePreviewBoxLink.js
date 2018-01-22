import React, { Component } from 'react';

export default class PagePreviewBoxLink extends Component {
  render(){
    const {href} = this.props
    return (<a href={href}>Learn more</a>);
  }
}
