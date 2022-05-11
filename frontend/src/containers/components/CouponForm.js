import React, { Component } from 'react';
import { Button, Container, Table, Icon, Image, Divider, Form, Item, Label, Message, Select, Header } from "semantic-ui-react";

class CouponForm extends Component {

    state = {
        code: ""
    }

    handleChange = e => {
        this.setState({
            code: e.target.value
        })
    }

    handleSubmit = e => {
        const { code } = this.state
        this.props.handleAddCoupon(e, code)
        this.setState({ code: "" })
    }

    render() {
        const { code } = this.state
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label>Coupon code</label>
                    <input placeholder="Coupon..." value={code} onChange={this.handleChange} />
                </Form.Field>
                <Button type="submit">Submit</Button>
            </Form>
        )
    }
}

export default CouponForm;
