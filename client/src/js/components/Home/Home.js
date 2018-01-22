import React, { Component } from 'react';
import EmailSubscriptionBox from 'Components/EmailSubscriptionBox';
import PagePreviewBox from 'Components/PagePreviewBox';

import "./Home.scss"

export default class Home extends React.Component{
	render() {

		const pagePreviewBox1 = {
			header:"Our Team",
			description:"Our team consists of the largest network of computer scientist educators in the country.",
			image:"image.png",
			link:"/About",
			linkText:"Learn More..."
		}
		const pagePreviewBox2 = {
			header:"Our Program Aspires to Empower",
			description:"Our program aspires to empower through mentorship, one-on-one lessons, relatable role models, an early introduction to coding and a specialized area of focus.",
			image:"image.png",
			link:"/Impact",
			linkText:"Learn More..."
		}
		const pagePreviewBox3 = {
			header:"Our Lessons",
			description:"Our lessons are tailored to each student’s skill level, learning ability and interest.",
			image:"image.png",
			link:"/About",
			linkText:"Learn More..."
		}

	return(
	<div>
		<div>
			<div>
				<video controls>
					<source src="movie.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				<p>
					codeConnects offers unparalleled one-on-one coding instruction
					and mentorship to empower underrepresented students who are
					disadvantaged in traditional educational environments with the skills
					and confidence necessary to become future creators, innovators,
					and leaders.
				</p>

				<div>
					<img src="" alt="image 1" />
					<img src="" alt="image 2" />
					<img src="" alt="image 3" />
				</div>
			</div>
    </div>
	  	<EmailSubscriptionBox />
		<div className="PagePreviewBoxesContainer">
			<PagePreviewBox pageInfo={pagePreviewBox1}/>
			<PagePreviewBox pageInfo={pagePreviewBox2}/>
			<PagePreviewBox pageInfo={pagePreviewBox3}/>
		</div>
  </div>
	);
	}
}
