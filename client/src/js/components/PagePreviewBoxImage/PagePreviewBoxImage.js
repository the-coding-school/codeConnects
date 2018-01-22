import React, { Component } from 'react';

export default class PagePreviewBoxImage extends Component {

  render(){
    const {image} = this.props

    return (<img src={image} alt="Alt text"/>);
  }
}
