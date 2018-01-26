import React, { Component } from 'react';
import './EmailSubscriptionBox.scss'
export default class EmailSubscriptionBox extends Component {
  constructor(props) {
    super(props);
    this.state = {value:""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An email address was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="EmailSubscriptionFormContainer">
      <form onSubmit={this.handleSubmit}>
          <input className="EmailSubscriptionBox" type="email" placeholder="Enter Your Email" onChange={this.handleChange} />
          <input className="EmailSubscriptionBox EmailSubscriptionBoxButton" type="submit" value="Subscribe" />
      </form>
      </div>

    );
  }

}
