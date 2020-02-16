import React, {Component} from "react";
import {Modal, Button, Spinner, Alert} from "react-bootstrap";
import axios from 'axios';
import SubscriberForm from "./SubscriberForm";

import config from '../config';
const API_URL = config.API_URL;

export default class CreateSubscriberModal extends Component {
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
                name: '',
                email: '',
                state: '',
                fields: [],
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleAddField = this.handleAddField.bind(this);
        this.handleFieldsChange = this.handleFieldsChange.bind(this);
    }

    handleClose = () => {
        this.setState({
            isSaving: false,
            showErrorAlert: false,
            errorText: '',
            showSuccessAlert: false,
            successText: '',
            formData: {
                name: '',
                email: '',
                state: '',
                fields: [],
            },
        });
        this.props.onClose();
    };

    handleSave = () => {
        console.log('Saving:', this.state.formData);

        this.setState({
            isSaving: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        this.setState({isSaving: true});
        axios.post(`${API_URL}/api/subscriber`, this.state.formData)
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

    /**
     * handle changes in the inner form
     * @param event
     */
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

    handleFieldsChange(event, index) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const fields = this.state.formData.fields;
        fields[index] = {
            [name]: value
        };

        this.setState({
            formData: {
                ...this.state.formData,
                fields: [
                    ...this.state.formData.fields
                ]
            }
        });
    }

    /**
     * A new field is added
     * @param newField
     */
    handleAddField(newField) {
        console.log(newField);

        // add the new field to formData.fields
        this.setState({
            formData: {
                ...this.state.formData,
                fields: [
                    ...this.state.formData.fields,
                    newField,
                ]
            }
        });
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="danger" show={this.state.showErrorAlert}>
                        {this.state.errorText}
                    </Alert>
                    <Alert variant="success" show={this.state.showSuccessAlert}>
                        {this.state.successText}
                    </Alert>
                    <SubscriberForm
                        data={this.state.formData}
                        onChange={this.handleFormChange}
                        onChangeField={this.handleFieldsChange}
                        onAddField={this.handleAddField}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
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
