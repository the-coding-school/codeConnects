import React, { Component } from 'react';
import './CirclePicture.scss'
export default class CirclePicture extends Component {
  render(){
    const {src, alt} = this.props
    return (<div className="CircularImageContainer">
              <img className="CircularImageFrame" src={src} alt={alt}/>
            </div>);
  }
}
