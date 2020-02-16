import React, {Component} from "react";
import {Modal, Button, Spinner} from "react-bootstrap";

import SubscriberForm from "./SubscriberForm";

export default class UpdateSubscriberModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            isSaving: false,
            title: '',
            formData: {},
        };
    }

    handleClose = () => {
        this.props.onClose();
    };

    handleSave = () => {
        this.setState({isSaving: true});
        setTimeout(() => this.setState({isSaving: false}), 3000);
    };

    render() {
        return (
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SubscriberForm data={this.props.data} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={this.handleClose}>
                        Delete
                    </Button>
                    {this.state.isSaving?
                        <Button variant="primary" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> Saving
                        </Button> :
                        <Button variant="primary" onClick={this.handleSave}>
                            Save
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
        );
    }

}