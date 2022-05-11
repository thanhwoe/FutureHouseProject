import React, { Component } from 'react';
import img from '../image/loogu.png'
import { Link, Redirect } from "react-router-dom";
import {localhost} from '../constants'

class LandingPage extends Component {
    state = {
        voucher: 'voucher'
    }
    handleCopyVoucher = () => {
        navigator.clipboard.writeText(this.state.voucher);
        alert('Voucher has been copied to clipboard ')
    }
    render() {
        return (
            <div className='landing-page'>
                <nav className="nav-header">
                    <ul className='nav-list'>
                        <li className='nav-item'><img src={img} className='ld-logo' /></li>
                        <li className='nav-item'><a href='#'>Home</a></li>
                        <li className='nav-item'><a href='#'>Contact Us</a></li>
                    </ul>
                </nav>

                <div className='container'>
                    <div className='content'>
                        <div className='header-text'>
                            <p>The ease of buying a blueprint of</p>&nbsp;&nbsp;&nbsp;&nbsp;
                            <p>dream house</p>
                        </div>
                        <p>No matter how quickly you need to make an order,</p>
                        <p>Our data and experts are always available.</p>
                        <p>Let's start now!</p>

                    </div>
                    <div className='card'>
                        <p className='event-header'>OPENING EVENT</p>
                        <p className='event-content'>Future House gives you a discount code on an order</p>
                        <div className='event-data'>
                            <div className='voucher'>
                                <p>{this.state.voucher}</p>
                            </div>
                            <button onClick={() => this.handleCopyVoucher()}>COPY</button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;
