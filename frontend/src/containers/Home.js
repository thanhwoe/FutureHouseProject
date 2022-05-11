import PropTypes from "prop-types";
import React, { Component, useState, useEffect } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Pagination,
  Card
} from "semantic-ui-react";
import { authAxios } from "../utils"
import axios from 'axios'
import { connect } from 'react-redux'
import { Fade, Slide } from 'react-slideshow-image';
import { Link, withRouter } from "react-router-dom";
import HomeProduct from './HomeProduct'
import HomeBlogList from './components/HomeBlogList'
import { localhost } from "../constants";
import 'react-slideshow-image/dist/styles.css'
// import slide1 from '../image/slide1.jpg'
// import slide2 from '../image/slide2.jpg'
// import slide3 from '../image/slide3.jpg'
import slide1 from '../image/slide-4.jpg'
import slide2 from '../image/slide-5.jpg'
import slide3 from '../image/slide-6.jpg'
import logo from '../image/loogu.png'
import { Helmet } from "react-helmet";
import Snowfall from 'react-snowfall'
var currentHost='https://stark-badlands-33991.herokuapp.com'
const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        />
        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        {children}
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const SlideFade = () => {
  // const fadeImages = [
  //   `${localhost}/media/slide1.jpg`,
  //   `${localhost}/media/slide2.jpg`,
  //   `${localhost}/media/slide3.jpg`,
  // ];
  const fadeImages = [
    slide1,
    slide2,
    slide3,
  ];
  const [autoplay] = useState(true)
  const properties = {
    duration: 1000,
    indicators: false,
    arrows: false
  }

  return (
    // <div className="slide-container" style={{width:'100%'}}>
    <Fade autoplay={autoplay} {...properties} >
      <div className="each-fade" >
        <div>
          <img src={fadeImages[0]} />
        </div>
      </div>
      <div className="each-fade" >
        <div>
          <img src={fadeImages[1]} />
        </div>
      </div>
      <div className="each-fade" >
        <div>
          <img src={fadeImages[2]} />
        </div>
      </div>
    </Fade>
    // </div>
  );
};

const Banner = ()=>{
  return(
    <div style={{display:'flex',flexDirection:'row'}}>
      <div className="banner banner_1">
      {/* <img src={banner1} /> */}
      </div>
      <div className="banner banner_2">
      {/* <img src={banner2} /> */}

      </div>
    </div>
  )
}

class CategoryHome extends Component {
  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state
    const categoryChoices = [
      'Bungalow',
      'Classical',
      'Modern',
      'Traditional',
      'Luxury'
    ]
    return (
      <Container style={{ margin: "40px 0" }}>
        <Menu stackable compact style={{ width: "100%" }} className="menuCate" secondary size="huge" >
          <Menu.Item header>House Style</Menu.Item>
          <Menu.Menu>
            {categoryChoices.map(cate => {
              return (
                <Link key={cate} to={{ pathname: `/category/${cate}` }}>
                  <Menu.Item

                    name={cate}
                    active={activeItem === cate}
                    onClick={this.handleItemClick}
                  /></Link>
              )
            })}</Menu.Menu>
        </Menu>
      </Container>
    )
  }
}



const SEO = () => (
  <Helmet>
    <title>Future House | Website selling quality house blueprints</title>
    <link rel="canonical" href={currentHost} />
    <meta name="description" content="Choosing your dream home is simple and convenient with Future House.
     Visual review of designs with 3D models. 
     Search our collection of 30k+ house designs by over 200 designers and architects to find the perfect blueprints to build." />
    <meta name="author" content="FutureHouse"/>
    <meta name="robots" content="index"/>
    <meta name="keywords" content="ecommerce,e-commerce,house,blueprint,house design,architectural,future house, 3D"/>
    <meta property="og:title" content="Future House | Website selling quality house blueprints"/>
    <meta property="og:type" content="website"/>
    <meta property="og:image" content={logo}/>
    <meta property="og:locale" content="vi_VN"/>
    <meta property="og:type" content="website"/>
    <meta property="og:description" content="Choosing your dream home is simple and convenient with Future House"/>
    <meta property="og:url" content={currentHost}/>
    <meta property="og:site_name" content="Future House"/>
    <meta name="geo.region" content="VN-DN" />
    <meta name="geo.placename" content="Đ&agrave; Nẵng" />
    <meta name="geo.position" content="16.068;108.212" />
    <meta name="ICBM" content="16.068, 108.212" />
  </Helmet>
)



const HomepageLayout = () => (

  <ResponsiveContainer>
    <SEO />
    <div>
    <a href={`${currentHost}/landing-page`}>
      <SlideFade />
    </a>
    <Banner/>
    <Snowfall  
    snowflakeCount={400}
    wind={[-1.0,1.0]}
    speed={[0.5,3.0]}
    radius={[2.5,4.0]}
    style={{zIndex:99}}
    />
    </div>
    <CategoryHome />
    <HomeProduct />
    <HomeBlogList />
  </ResponsiveContainer>
);



const mapDispatchToProps = dispatch => {
  return {
    refreshCart: () => dispatch(fetchCart())
  }
}

export default connect(null, mapDispatchToProps)(HomepageLayout)
