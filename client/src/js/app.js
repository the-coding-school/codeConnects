import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from './components/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


export default class App extends Component {
  render() {
    return (
	<BrowserRouter>
	<Header/>

	    <Navbar />
      		<Switch>
	    	</Switch>
	<Footer />
	</BrowserRouter>
    );
  }
}

render(<App />, document.getElementById('app'));
