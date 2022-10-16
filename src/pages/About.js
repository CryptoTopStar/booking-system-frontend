import React from "react"
import useInquiry from '../hooks/useInquiry'
import { Title } from "../commonStyle/CommonStyle"
import { Avatar, Grid, Typography } from "@mui/material"


const About = () => {
  const inquiry = useInquiry()

  const handleClick = () => {
    inquiry.handleOpen()
  };

  return <>
    <div className="eyecatch">
      <div className="page-title-wrapper">
        <Title>
          <h2>About</h2>
        </Title>
      </div>
      <div className="container" >
        <div>
          <div className="subtitle">Why choose nancy</div>
          <div className="title-border"></div>
        </div>
        <Grid container spacing={10}>
          <Grid item xs={12} lg={6}>
            <Typography variant="subtitle1" gutterBottom>
              But in order that you may see whence all this born error of those who accuse pleasure and praise pain, I will open the whole matter, and explain the very things which were said by that discoverer of truth and, as it were, the architect of a happy life.
            </Typography>
            <Typography>
              It is important to take care of the patient, to be followed by the doctor, but it is a time of great pain and suffering. For to come to the smallest detail, no one should practice any kind of work unless he derives some benefit from it. Do not be angry with the pain in the reprimand in the pleasure he wants to be a hair from the pain in the hope that there is no breeding. Unless they are blinded by lust, they do not come out; they are in fault who abandon their duties and soften their hearts, that is toil.
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <img alt="about-img" src="https://demo.myherothemes.com/nancy/wp-content/uploads/sites/23/2015/08/about-img3.jpg" />
          </Grid>
        </Grid>
        <br />
        <div>
          <div>
            <div className="subtitle">Our exports</div>
            <div className="title-border"></div>
          </div>
          <Grid container spacing={3}>
            <Grid item direction='column' xs={12} sm={6} lg={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Avatar style={{ width: '200px', height: '200px' }} src="https://demo.myherothemes.com/nancy/wp-content/uploads/sites/23/2015/08/team4.jpg" />
              <div className="team-member-name">Alice James</div>
            </Grid>
            <Grid item direction='column' xs={12} sm={6} lg={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Avatar style={{ width: '200px', height: '200px' }} src="https://demo.myherothemes.com/nancy/wp-content/uploads/sites/23/2015/08/team4.jpg" />
              <div className="team-member-name">Alice James</div>
            </Grid>
            <Grid item direction='column' xs={12} sm={6} lg={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Avatar style={{ width: '200px', height: '200px' }} src="https://demo.myherothemes.com/nancy/wp-content/uploads/sites/23/2015/08/team4.jpg" />
              <div className="team-member-name">Alice James</div>
            </Grid>
            <Grid item direction='column' xs={12} sm={6} lg={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Avatar style={{ width: '200px', height: '200px' }} src="https://demo.myherothemes.com/nancy/wp-content/uploads/sites/23/2015/08/team4.jpg" />
              <div className="team-member-name">Alice James</div>
            </Grid>
          </Grid>
        </div>
      </div>

    </div>

  </>;
}

export default About