import React, { Component } from 'react';
import { render } from 'react-dom';


export default class Header extends Component {
  render() {
    return (
    <div>
        <h1>Code Connects</h1>
      <button>Log in</button>
      <button>Donate</button>
    </div>
    );
  }
}
