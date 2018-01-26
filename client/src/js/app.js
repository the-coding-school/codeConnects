import React, { Component } from 'react';
import { render } from 'react-dom';

import Header from 'Components/Header' ;
import Footer from 'Components/Footer' ;

//These will each be their own views probably
import Home from 'Components/Home';
import Navbar from 'Components/Navbar'

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import "./app.scss"
export default class App extends Component {
  render() {
    return (
	<BrowserRouter>
  <div className="AppContainer">
	 <Header />
	    <Navbar />
      <Switch>
	       <Route exact path="/" component={Home} />
	    </Switch>
	   <Footer />
  </div>
	</BrowserRouter>
    );
  }
}

render(<App />, document.getElementById('app'));
