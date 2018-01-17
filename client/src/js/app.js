import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from './components/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


export default class App extends Component {
  render() {
    return (
      <div>
	<Header/>

	<BrowserRouter>
	    <Navbar />
      		<Switch>
	    	</Switch>
	</BrowserRouter>
	<Footer />

      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
