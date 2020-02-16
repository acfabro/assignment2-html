import React, {Component} from "react";
import {Button, Form, Row, Col} from "react-bootstrap";

export default class SubscriberForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                id: '',
                name: '',
                email: '',
                state: '',
                fields: [],
            }
        };
    }

    render() {
        //const data = this.state.formData;
        const data = this.props.data;
        return (
            <Form>
                <input type="hidden" value={data.id ? data.id : ''}/>
                <Form.Group controlId="formName">
                    <Form.Label size="sm">Name</Form.Label>
                    <Form.Control name="name" type="text" value={data.name} onChange={this.props.onChange}/>
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" value={data.email} onChange={this.props.onChange}/>
                </Form.Group>

                <Form.Group controlId="formState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" name="state" value={data.state} onChange={this.props.onChange}>
                        <option value=""></option>
                        <option value="unconfirmed">Unconfirmed</option>
                        <option value="active">Active</option>
                        <option value="unsubscribed">Unsubscribed</option>
                        <option value="junk">Junk</option>
                        <option value="bounced">Bounced</option>
                    </Form.Control>
                </Form.Group>

                <div className="formPanel rounded p-3">
                    <h5>Add field</h5>
                    <Form.Group as={Row} controlId="newTitle">
                        <Form.Label column md="3">Title</Form.Label>
                        <Col md="9">
                            <Form.Control type="email"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="newType">
                        <Form.Label column md="3">Type</Form.Label>
                        <Col md="9">
                            <Form.Control as="select">
                                <option value="string">String</option>
                                <option value="number">Number</option>
                                <option value="date">Date</option>
                                <option value="boolean">Boolean</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="newType">
                        <Col md={{span: 9, offset: 3}}>
                            <Button size="sm">Add Field</Button>
                        </Col>
                    </Form.Group>

                </div>
            </Form>
        );
    }
}