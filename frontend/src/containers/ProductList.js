import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message, Header } from 'semantic-ui-react'
import { productListURL, addToCartURL } from '../constants'
import { authAxios } from "../utils"
import { fetchCart } from '../store/actions/cart'
import InfiniteScroll from 'react-infinite-scroll-component'
import { localhost } from '../constants'
import { Link, withRouter } from "react-router-dom";



class ProductDetail extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            data: [],
            hasMore: true,
            offset: 0,
            limit: 6
        }
        // window.onscroll = () => {
        //     const { state: { error, loading, hasMore } } = this
        //     if (error || loading || !hasMore) return;
        //     if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) {
        //         this.loadData()
        //     }
        // }
    }
    componentDidMount() {
        window.scrollTo(0, 0)

    }
    loadData = () => {
        this.setState({ loading: true })
        setTimeout(() => {

            this.setState({ loading: true }, () => {
                const { offset, limit } = this.state;
                axios
                    .get(
                        `${localhost}/api/products-list-inf/?limit=${limit}&offset=${offset}`
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


    render() {
        //   console.log(this.props)
        const { error, hasMore, loading, data } = this.state;
        return (

            <Container style={{ minHeight: '100vh' ,paddingTop:'50px'}}>
                <InfiniteScroll
                    style={{ display: 'flex', 'flexWrap': 'wrap' }}
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
                            <Link key={item.id} exact to={{ pathname: `products/${item.slug}/${item.id}`}}>
                                <Card className='customProdCard' style={{ margin: '20px 10px', height: '300px' }}>
                                    <Image src={item.thumbnail} wrapped ui={true} />
                                    <Card.Content>
                                        {/* onClick={()=>this.props.history.push(`/products/${item.id}`)} */}
                                        <Card.Header >{item.title}</Card.Header>
                                        <Card.Meta>
                                            <span className='cinema'>{item.category}</span>
                                        </Card.Meta>
                                        <Card.Description>{item.overview}</Card.Description>
                                    </Card.Content>
                                </Card>
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

// const mapStateToProps = state =>{
//     return{
//         loading:state.loading,
//         error: state.error,
//         data:state.data
//     }
// }

const mapDispatchToProps = dispatch => {
    return {
        refreshCart: () => dispatch(fetchCart())
    }
}

export default connect(null, mapDispatchToProps)(ProductDetail)