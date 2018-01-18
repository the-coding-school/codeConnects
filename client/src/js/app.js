import React, { Component } from 'react';
import { render } from 'react-dom';

import Header from './components/Header' ;
import Footer from './components/Footer' ;

//These will each be their own views probably
import Home from './components/Home';
import Navbar from './components/Navbar'


import { BrowserRouter, Route, Switch } from 'react-router-dom';


export default class App extends Component {
  render() {
    return (
	<BrowserRouter>
  <div>
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
