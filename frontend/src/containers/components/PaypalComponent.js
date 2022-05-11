import React, { Component } from "react";
import { authAxios } from "../../utils";
import { checkoutURL, downloadURL } from "../../constants"
import { Link, Redirect, withRouter } from 'react-router-dom'
import ReactDOM from "react-dom"
import axios from "axios";
import { NotificationContainer, NotificationManager } from 'react-notifications';

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

class PaypalComponent extends Component {
    state = {
        isPaid: false,
        isError: false,
        itemIDsold:[],
        listURL:[]
    }

    createOrder(data, actions) {
        const { getdata } = this.props
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: getdata.total,
                    },
                },
            ],
        });
    }

    async onApprove(data, actions) {
        const order = await actions.order.capture();
        const {itemIDsold,listURL} = this.state
        authAxios
            .post(checkoutURL, { itemIDsold, listURL })
            .then(res => {
                NotificationManager.success('Success message', 'Payment success',5000);
                this.setState({ isPaid: true })
            })
            .catch(err => {
                this.setState({ itemIDsold:[], listURL:[] })
            })
    }
    onError(err) {
        //   alert('error')
        NotificationManager.error('Error message', 'Payment faile',5000);

        // console.log(err)
        this.setState({ itemIDsold:[], listURL:[] })

    }

    // 2 method o duoi xu ly truoc payment
    // chay vong lap cho moi item in order
    // lay tat ca download url va itemID push vao array 
    // gui len server o method onApprove ben tren
    handleAddItem = () => {
        const { getdata } = this.props
        // console.log(getdata)
        {getdata && getdata.order_items.map((item)=>(
            this.handleAddItem2(item)
        ))}
    }
    handleAddItem2=(item)=>{
        const { itemIDsold,listURL } = this.state
        itemIDsold.push(item.item.id)
        axios
            .get(downloadURL(item.item.id))
            .then(res=>{
                // console.log(res)
                listURL.push(res.data)
            })
            .catch(err=>{

            })
    }

    render() {
        const { isPaid,itemIDsold,listURL } = this.state
        // const { getdata } = this.props
        // console.log(listURL)
        // console.log(itemIDsold)
        if (isPaid) {
            return (
                <Redirect to='/download'/>
                // <div><Button onClick={()=>this.handleAddItem()}/></div>
            )
        } else {
            return (
                <div style={{textAlign:'center'}}>
                    {/* <Button onClick={this.text} /> */}
                    <PayPalButton
                        createOrder={(data, actions) => this.createOrder(data, actions)}
                        onApprove={(data, actions) => this.onApprove(data, actions)}
                        onClick={()=>this.handleAddItem()}
                    />
                </div>
            );
        }
    }
}

export default PaypalComponent;
