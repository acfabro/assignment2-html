import React, {Component} from "react";
import {Modal, Button, Spinner} from "react-bootstrap";
import axios from "axios";
import SubscriberForm from "./SubscriberForm";

import config from '../config';
const API_URL = config.API_URL;

export default class UpdateSubscriberModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            title: '',
            isSaving: false,
            showErrorAlert: false,
            errorText: '',
            showSuccessAlert: false,
            successText: '',
            formData: {
                id: '',
                name: '',
                email: '',
                state: '',
                fields: [],
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleClose = () => {
        this.props.onClose();
    };

    handleShow = () => {
        this.setState({
            formData: this.props.data
        })
    };

    handleSave = () => {
        this.setState({
            isSaving: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        axios.patch(`${API_URL}/api/subscriber/${this.state.formData.id}`, this.state.formData)
            .then((response) => {
                this.setState({
                    isSaving: false,
                    showSuccessAlert: true,
                    successText: response.data.message,
                });
            })
            .catch((error) => {
                this.setState({
                    isSaving: false,
                    showErrorAlert: true,
                    errorText: error.response ? error.response.data.message : 'An error occurred',
                });
            })
    };

    handleChange(formData) {
        this.setState({
            formData
        });
    }

    handleFormChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            formData: {
                ...this.state.formData,
                [name]: value
            }
        });
    }

    render() {
        return (
            <Modal show={this.props.show} onShow={this.handleShow} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SubscriberForm
                        data={this.state.formData}
                        onChange={this.handleFormChange}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={this.handleClose}>
                        Delete
                    </Button>
                    {this.state.isSaving ?
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