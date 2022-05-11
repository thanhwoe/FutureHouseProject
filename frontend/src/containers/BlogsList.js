import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Header, Grid } from 'semantic-ui-react'
import { productListURL, addToCartURL } from '../constants'
import { authAxios } from "../utils"
import { fetchCart } from '../store/actions/cart'
import InfiniteScroll from 'react-infinite-scroll-component'
import { localhost } from '../constants'
import { Link, withRouter } from "react-router-dom";



class BlogList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            data: [],
            hasMore: true,
            offset: 0,
            limit: 3
        }

    }
    loadData = () => {
        this.setState({ loading: true })
        setTimeout(() => {

            this.setState({ loading: true }, () => {
                const { offset, limit } = this.state;
                axios
                    .get(
                        `${localhost}/api/blogs-list-inf/?limit=${limit}&offset=${offset}`
                    )
                    .then(res => {
                        const newData = res.data.data
                        const hasMore = res.data.has_more
                        this.setState({
                            hasMore: hasMore,
                            loading: false,
                            data: [...this.state.data, ...newData],
                            offset: offset + limit
                        })
                    })
                    .catch(err => {
                        this.setState({
                            error: err.message,
                            loading: false
                        })
                    })
            })
        }, 1500);
    }


    componentDidMount() {
        window.scrollTo(0, 0)
        // this.loadData()
    }


    render() {
        //   console.log(this.props)
        const { error, hasMore, loading, data } = this.state;

        return (

            <Container style={{ minHeight: '100vh', paddingTop: '50px' }}>
                <InfiniteScroll
                    dataLength={data.length} //This is important field to render the next data
                    next={() => this.loadData()}
                    hasMore={hasMore}
                // loader={<h4>Loading...</h4>}
                // endMessage={

                //   <p style={{ textAlign: 'center', display:'flex' }}>
                //     <b>Yay! You have seen it all</b>
                //   </p>
                // }
                >
                    {data.map(item => {
                        return (
                            <Link key={item.id} exact to={{ pathname: `post/${item.slug}/${item.id}` }}>
                                <div className='post_item'>
                                    <Image src={item.thumbnail} />
                                    <div className='post_detail'>
                                        <Header as='h1' className="post_title">{item.title}</Header>
                                        <div className='separate' />
                                        <div className='post_overview'>{item.overview}</div>
                                        <div className='post_author'>Author: {item.author}</div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </InfiniteScroll>
                {error && <div>{error}</div>}
                {loading && <Container textAlign='center'><Loader active inline size='large' /></Container>}
                {!hasMore && <Container textAlign='center'><Header>No more results</Header></Container>}
            </Container>
            // <div>{data.length}</div>
        )
    }
}



export default BlogList