import React, { Component } from 'react';
import { Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message } from 'semantic-ui-react'
import { authAxios } from '../../utils';
import {rateStarURL} from '../../constants'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { connect } from 'react-redux'

const StartRating = (props) => {
    const handleRate = (value)=>{
        if(props.authenticated){
            authAxios
            .post(rateStarURL, { 
                itemID:props.id, 
                star: value
            })
            .then(res => {
                NotificationManager.success('Success message', 'Thank you for rating this product');
            })
            .catch(err => {
            })
        }else{
            NotificationManager.warning('Warning message', 'You need login first', 10000);
        }
        
    }
    return (
        <div className='rating'>
                <Icon name='star' className='s1' onClick={()=>handleRate(5)}/>
                <Icon name='star' className='s2' onClick={()=>handleRate(4)}/>
                <Icon name='star' className='s3' onClick={()=>handleRate(3)}/>
                <Icon name='star' className='s4' onClick={()=>handleRate(2)}/>
                <Icon name='star' className='s5' onClick={()=>handleRate(1)}/>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
    };
};


export default connect(mapStateToProps,null)(StartRating);
