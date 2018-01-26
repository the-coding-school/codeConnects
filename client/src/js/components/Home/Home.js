import React, { Component } from 'react'
import EmailSubscriptionBox from 'Components/EmailSubscriptionBox'
import PagePreviewBox from 'Components/PagePreviewBox'
import CirclePicture from 'Components/CirclePicture'

import BoxImage1 from 'Images/OurTeam.jpg'
import BoxImage2 from 'Images/OurPrograms.jpg'
import CircleImage1 from 'Images/Circle1.jpg'
import CircleImage2 from 'Images/Circle2.jpg'
import CircleImage3 from 'Images/Circle3.jpg'

import "./Home.scss"

export default class Home extends React.Component{
	render() {

		const pagePreviewBox1 = {
			header:"Our Team",
			description:"Our team consists of the largest network of computer scientist educators in the country.",
			image:BoxImage1,
			link:"/About",
			linkText:"Learn More..."
		}
		const pagePreviewBox2 = {
			header:"Our Programs Empower",
			description:"Our program aspires to empower through mentorship, one-on-one lessons, relatable role models, an early introduction to coding and a specialized area of focus.",
			image:BoxImage2,
			link:"/Impact",
			linkText:"Learn More..."
		}
		const pagePreviewBox3 = {
			header:"Our Lessons",
			description:"Our lessons are tailored to each student’s skill level, learning ability and interest.",
			image:BoxImage2,
			link:"/About",
			linkText:"Learn More..."
		}

	return(
	<div className="HomePageContainer">
		<div>
			<div>
				<video controls>
					<source src="movie.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				<div className="HomePageDescriptionContainer">
					<p className="HomePageDescription">
						<strong>codeConnects</strong> offers unparalleled one-on-one coding instruction
						and mentorship to empower underrepresented students who are
						disadvantaged in traditional educational environments with the skills
						and confidence necessary to become future creators, innovators,
						and leaders.
					</p>
				</div>

				<div className="CirclePicturesContainer">
					<CirclePicture src={CircleImage1} alt="image 1" />
					<CirclePicture src={CircleImage2} alt="image 2" />
					<CirclePicture src={CircleImage3} alt="image 3" />
				</div>
			</div>
    </div>

		<div className="EmailSubscriptionBoxContainer">
				<p className="EmailSubscriptionBoxDescription">
				Keep up to date with our latest news, events and calendar! Subscribe to our Newsletter.
				</p>
				<EmailSubscriptionBox />
		</div>


		<div className="PagePreviewBoxesContainer">
			<PagePreviewBox pageInfo={pagePreviewBox1}/>
			<PagePreviewBox pageInfo={pagePreviewBox2}/>
			<PagePreviewBox pageInfo={pagePreviewBox3}/>
		</div>
  </div>
	);
	}
}
