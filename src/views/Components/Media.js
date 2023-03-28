import React, { Component } from 'react';
import './index.css';
import arrowdown from "assets/img/arrowdown.png";
import arrowdown2 from "assets/img/arrowdown2.png";
import arrow3 from "assets/img/arrow3.png";
import Carousel from "react-slick";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";

import image1 from "assets/img/profile-bg2.jpg";
import image2 from "assets/img/bg2.jpg";
import image3 from "assets/img/bg3.jpg";
import { Settings } from '@material-ui/icons';
import {db, storage} from "../Components/firebase";
import { useAuth } from '../Components/auth';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false
};

class Media extends Component {
  constructor(props) {
    super(props)
    this.state = { matches: window.matchMedia("(min-width: 768px)").matches };
  }
  componentDidMount() {
    const handler = e => this.setState({matches: e.matches});
    window.matchMedia("(min-width: 768px)").addListener(handler);
  }
  render() {
    return (
      <div>
      <div className="title-typo" >
      {this.state.matches && this.props.name=="title-typo" && (<h1 style={{color: "#990000",}}>INTELLECTUAL <br /> INSTRUCTOR</h1>)}
      {this.state.matches && this.props.name=="arrow" && (<div><br /><br /><br /><img src={arrowdown} style={{paddingLeft: "25%"}}></img></div>)}
      {this.state.matches && this.props.name=="arrow2" && (<div><br /><br /><br /><img src={arrowdown2} style={{paddingLeft: "42%"}}></img></div>)}
      {this.state.matches && this.props.name=="arrow3" && (<div className="arrow3" style={{paddingLeft: "25%"}}><h3 style={{textDecoration: "underline"}}>See How It Works!</h3><img src={arrow3}></img></div>)}
      {this.state.matches && this.props.name=="search" && (
        <div id="container">
          <form id="form" action="">
            <input id="input" type="text" placeholder="Enter a subject" required></input><br />
          </form>
        </div>
        )}
      {!this.state.matches && this.props.name=="title-typo" && (<h3 style={{color: "red",}}>INTELLECTUAL <br /> INSTRUCTOR</h3>)}
      {!this.state.matches && this.props.name=="arrow3" && (<div className="arrow3"><h3 style={{textDecoration: "underline"}}>See How It Works!</h3><img src={arrow3} style={{width: "90%", paddingLeft: "10%"}}></img></div>)}
      {!this.state.matches && this.props.name=="search" && (
        <div id="container" style={{width:"200px",left:"100%", height:"70px"}}>
          <form id="form" action="">
            <input id="input" type="text" placeholder="Enter a subject" style={{width:"150px"}} required></input><br />
          </form>
        </div>
        )}
      </div>
      {this.state.matches && this.props.name=="carousel" && (
        <div className={this.props.classes.section}>
        <h2 style={{textAlign:"center"}}>Don't simply trust us, See what one of your kind says....</h2>
        <div className={this.props.classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8} className={this.props.classes.marginAuto}>
              <Card carousel>
                <Carousel {...settings}>
                  <div>
                    <img src={image1} alt="First slide" className="slick-image" />
                    <div className="slick-caption" style={{top: "0"}}>
                      <h2>Yash Patel</h2>
                      <h4 className="slick-caption" style={{display:"block"}}>
                       "The best you can get for technical mentoring.
                        The best you can get for mentoring. The awesome set of verified mentors will provide guidance and mentoring help when you are stuck. 10 out of 10."
                      </h4>
                    </div>
                  </div>
                  <div>
                    <img
                      src={image2}
                      alt="Second slide"
                      className="slick-image"
                    />
                     <div className="slick-caption" style={{top: "0"}}>
                      <h2>Chirag Fabiyani</h2>
                      <h4 className="slick-caption">
                        ", you can really gain new insights and experiences here. And it certainly can't go unnoticed."
                      </h4>
                    </div>
                  </div>
                  <div>
                    <img src={image3} alt="Third slide" className="slick-image" />
                    <div className="slick-caption" style={{top: "0"}}>
                      <h2>Kirtan Patadia</h2>
                      <h4 className="slick-caption">
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, reiciendis? Tempora beatae, sit aspernatur omnis "
                      </h4>
                    </div>
                  </div>
                </Carousel>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      )}
      </div>
    );
  }
}

export default Media;