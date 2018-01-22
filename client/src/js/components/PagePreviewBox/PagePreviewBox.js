import React, { Component } from 'react';

import PagePreviewBoxDescription from 'Components/PagePreviewBoxDescription'
import PagePreviewBoxHeader from 'Components/PagePreviewBoxHeader'
import PagePreviewBoxImage from 'Components/PagePreviewBoxImage'
import PagePreviewBoxLink from 'Components/PagePreviewBoxLink'

import "./PagePreviewBox.scss"

export default class PagePreviewBox extends Component {
  render(){
    const {
     header,
     description,
     link,
     linkText,
     image
   } = this.props.pageInfo;

    return (
    <div className="PagePreviewBoxContainer">
      <div className="PagePreviewBoxImageContainer">
        { image && <PagePreviewBoxImage src={image}></PagePreviewBoxImage>}
      </div>
      <div className="PagePreviewBoxTextContainer">
        { header && <PagePreviewBoxHeader>{header}</PagePreviewBoxHeader> }
        { description && <PagePreviewBoxDescription>{description}</PagePreviewBoxDescription>}
        { link && <PagePreviewBoxLink to={link}>{linkText}</PagePreviewBoxLink>}
      </div>
    </div>
    );
  }
}
