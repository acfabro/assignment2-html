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
            },
            newField: {
                title: '',
                type: '',
                value: '',
            },
        };
        this.changeAddField = this.changeAddField.bind(this);
        this.submitNewField = this.submitNewField.bind(this);
    }

    changeAddField(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            newField: {
                ...this.state.newField,
                [name]: value
            }
        });
    }

    submitNewField() {
        if (!this.state.newField.title ||
            !this.state.newField.type ||
            !this.state.newField.value
        ) {
            return;
        }

        this.props.onAddField(this.state.newField);

        this.setState({
            newField: {
                title: '',
                type: '',
                value: '',
            }
        });
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

                {data.fields.length > 0 &&
                    <h5>Fields</h5>
                }

                {data.fields && data.fields.map((item, index) => (
                    <div key={index}>
                        <Form.Group as={Row} controlId="newTitle">
                            <Form.Label column md="3">Title</Form.Label>
                            <Col md="9">
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={item.title}
                                    onChange={event => this.props.onChangeField(event, index)}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="newType">
                            <Form.Label column md="3">Type</Form.Label>
                            <Col md="9">
                                <Form.Control
                                    as="select"
                                    name="type"
                                    value={item.type}
                                    onChange={event => this.props.onChangeField(event, index)}>
                                    <option value=""></option>
                                    <option value="string">String</option>
                                    <option value="number">Number</option>
                                    <option value="date">Date</option>
                                    <option value="boolean">Boolean</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="newTitle">
                            <Form.Label column md="3">Value</Form.Label>
                            <Col md="9">
                                <Form.Control
                                    type="text"
                                    name="value"
                                    value={item.value}
                                    onChange={event => this.props.onChangeField(event, index)}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="newDelete">
                            <Col md={{span: 9, offset: 3}}>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => this.props.onDeleteField(index)}>Delete {item.title}</Button>
                            </Col>
                        </Form.Group>

                        <hr/>

                    </div>
                ))}

                <div className="formPanel rounded p-3">
                    <h5>Add field</h5>
                    <Form.Group as={Row} controlId="newTitle">
                        <Form.Label column md="3">Title</Form.Label>
                        <Col md="9">
                            <Form.Control type="text" name="title" onChange={this.changeAddField}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="newType">
                        <Form.Label column md="3">Type</Form.Label>
                        <Col md="9">
                            <Form.Control as="select" name="type" onChange={this.changeAddField}>
                                <option value=""></option>
                                <option value="string">String</option>
                                <option value="number">Number</option>
                                <option value="date">Date</option>
                                <option value="boolean">Boolean</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="newTitle">
                        <Form.Label column md="3">Value</Form.Label>
                        <Col md="9">
                            <Form.Control type="text" name="value" onChange={this.changeAddField}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="newType">
                        <Col md={{span: 9, offset: 3}}>
                            <Button size="sm" onClick={this.submitNewField}>Add Field</Button>
                        </Col>
                    </Form.Group>

                </div>
            </Form>
        );
    }
}