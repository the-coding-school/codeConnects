import React, { Component } from 'react';
import EmailSubscriptionBox from './EmailSubscriptionBox';


export default class Home extends React.Component{
	render() {
	return(
	<div>
		Hello World This is the homepage
		<div>
			<div>
				<video controls>
					<source src="movie.mp4" type="video/mp4">
					Your browser does not support the video tag.
				</video>
				<h3>
					codeConnects offers unparalleled one-on-one coding instruction
					and mentorship to empower underrepresented students who are
					disadvantaged in traditional educational environments with the skills
					and confidence necessary to become future creators, innovators,
					and leaders.
				</h3>
				<div>
					<img src="" alt="image 1">
					<img src="" alt="image 2">
					<img src="" alt="image 3">
				</div>
			</div>
    </div>
	  	<EmailSubscriptionBox />
		<div>
		</div>
  </div>
	);
	}
}
