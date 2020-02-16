import React from "react";
import {Modal, Button, Form, Row, Col} from "react-bootstrap";


export default props => (
    <Form>
        <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" />
        </Form.Group>

        <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" />
        </Form.Group>

        <Form.Group controlId="formState">
            <Form.Label>State</Form.Label>
            <Form.Control as="select">
                <option></option>
                <option value="active">Active</option>
                <option value="unsubscribed">Unsubscribed</option>
                <option value="junk">Junk</option>
                <option value="bounced">Bounced</option>
                <option value="unconfirmed">Unconfirmed</option>
            </Form.Control>
        </Form.Group>

        <div className="formPanel rounded p-3">
            <h5>Add field</h5>
            <Form.Group as={Row} controlId="newTitle">
                <Form.Label column md="3">Title</Form.Label>
                <Col md="9">
                    <Form.Control type="email" />
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
                <Col md="3"></Col>
                <Col md="9">
                    <Button size="sm">Add Field</Button>
                </Col>
            </Form.Group>

        </div>

    </Form>
);