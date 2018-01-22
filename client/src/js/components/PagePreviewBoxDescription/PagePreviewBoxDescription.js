import React, { Component } from 'react';

import './PagePreviewBoxDescription.scss'
export default class PagePreviewBoxDescription extends Component {

  render(){
    return (
      <div className="PagePreviewBoxDescriptionContainer">
        <p className="PagePreviewBoxDescriptionBody"> {this.props.children}</p>
      </div>
    );
  }

}
