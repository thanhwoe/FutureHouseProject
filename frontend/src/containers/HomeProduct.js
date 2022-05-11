import React, { Component, useState } from "react";
import {
    Container,
    Header,
    Icon,
    Image,
    Segment,
    Card,
    Dimmer,
    Loader, Grid, Divider
} from "semantic-ui-react";
import { authAxios } from "../utils"
import { productListURL, addToCartURL, isStaffURL } from '../constants'
import axios from 'axios'
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { SolarSystemLoading } from 'react-loadingg';
import img1 from '../image/descrip-1.jpg'
import img2 from '../image/descrip-2.jpg'
import img3 from '../image/descrip-3.png'

class HomeProduct extends React.Component {

    state = {
        loading: true,
        error: null,
        data: [],
    }
    componentDidMount() {
        axios
            .get(productListURL)
            .then(res => {
                this.setState({ data: res.data, loading: false })
            })
            .catch(err => {
                this.setState({ error: err, loading: false })
            });
    }


    render() {
        const { data, loading } = this.state;
        const { dataSearch, isSearch } = this.props;
        if (isSearch) {
            return (
                <React.Fragment>
                    {dataSearch.length > 0 ? (
                        <Container style={{ display: 'flex', margin: "20px 0 250px", flexWrap: 'wrap' }}>
                            {dataSearch.map(item => {
                                return <Link key={item.id} to={{ pathname: `products/${item.slug}/${item.id}` }} style={{ marginBottom: '30px' }}>
                                    <Card className='customProdCard'>
                                        <Image src={item.thumbnail} wrapped ui={true} />
                                        <Card.Content>
                                            <Card.Header >{item.title}</Card.Header>
                                            <Card.Meta>
                                                <span className='cinema'>{item.category}</span>
                                            </Card.Meta>
                                            <Card.Description>{item.overview}</Card.Description>
                                        </Card.Content>
                                    </Card>
                                </Link>
                            })
                            }
                        </Container>
                    ) : (<Header as='h1' textAlign='center'>No results were found</Header>)}
                </React.Fragment>

            )
        }
        else if (loading) {
            return (
                <Container >
                    <Dimmer active >
                        <SolarSystemLoading />
                    </Dimmer>
                </Container>
            )
        }
        else {
            return (
                <React.Fragment>
                    <Container>
                        <Header as="h2" style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <Icon
                                name="building"
                                style={{ fontSize: "1em", display: "contents" }} /> New artchitectur
                        </Header>
                    </Container>

                    <Container style={{ display: 'flex', marginTop: "20px" }}>

                        {data.filter(item => {
                            return item.label === 'New'
                        }).slice(0, 3).map(item => {
                            return <Link key={item.id} to={{ pathname: `products/${item.slug}/${item.id}` }}>
                                <Card className='customProdCard'>
                                    <Image src={item.thumbnail} wrapped ui={true} />
                                    <Card.Content>
                                        <Card.Header >{item.title}</Card.Header>
                                        <Card.Meta>
                                            <span className='cinema'>{item.category}</span>
                                        </Card.Meta>
                                        <Card.Description>{item.overview}</Card.Description>
                                    </Card.Content>
                                </Card>
                            </Link>
                        })}

                    </Container>
                    <Container style={{ margin: "10px 0 50px" }}><Link to='/products' style={{ float: 'right' }}>More...</Link></Container>
                    <Divider hidden />
                    <Container style={{ margin: "20px" }}>
                        <Segment padded color='teal'>
                            <Header textAlign='center' as='h2'>Why Buy House Blueprint From Future House??</Header>
                            <Divider hidden />
                            <Grid columns={3} stackable textAlign='center'>
                                <Grid.Row >
                                    <Grid.Column >
                                        <Image src={img1} className='des-img'/>
                                        <Header as='h3'>Affirm the business</Header>
                                        <Divider hidden />
                                        <p>Our business has a seasoned staff with an unmatched expertise in helping builders and homeowners find house plans that match their needs and budgets.</p>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Image src={img2} className='des-img' />
                                        <Header as='h3'>Curated Portfolio</Header>
                                        <Divider hidden />
                                        <p>Our portfolio is comprised of house blueprint from designers and architects around the world. Designs are added daily. We regularly add photos and model 3D of client-built houses.</p>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Image src={img3} className='des-img' />
                                        <Header as='h3'>Online 3D Modeling Experience</Header>
                                        <Divider hidden />
                                        <p>Help users have an overview of the project to travel, experience, and interact with the virtual house</p>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Container>
                    <Container>
                        <Header as="h2" style={{ textAlign: 'center', margin: '50px 0' }}>
                            <Icon
                                name="compass"
                                style={{ fontSize: "1em", display: "contents" }} /> Trending artchitectur
                        </Header>
                    </Container>

                    <Container style={{ display: 'flex', marginTop: "20px" }}>

                        {data.filter(item => {
                            return item.label === 'Trending'
                        }).slice(0, 3).map(item => {
                            return <Link key={item.id} to={{ pathname: `products/${item.slug}/${item.id}` }}>
                                <Card className='customProdCard'>
                                    <Image src={item.thumbnail} wrapped ui={true} />
                                    <Card.Content>
                                        <Card.Header>{item.title}</Card.Header>
                                        <Card.Meta>
                                            <span className='cinema'>{item.category}</span>
                                        </Card.Meta>
                                        <Card.Description>{item.overview}</Card.Description>
                                    </Card.Content>
                                </Card></Link>
                        })}

                    </Container>
                    <Container style={{ margin: "10px 0 50px" }}><Link to='/products' style={{ float: 'right' }}>More...</Link></Container>
                </React.Fragment>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        dataSearch: state.search.dataSearch,
        isSearch: state.search.loading
    }
}



export default connect(mapStateToProps, null)(HomeProduct)