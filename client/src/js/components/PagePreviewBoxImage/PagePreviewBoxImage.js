import React, { Component } from 'react';

import './PagePreviewBoxImage.scss'
export default class PagePreviewBoxImage extends Component {
  
  render(){
    const {image,alt} = this.props
    return (<img className="PagePreviewBoxImage" src={image} alt={alt}/>);
  }
}
