import React, {Component} from "react";
import {Modal, Button, Spinner, Alert} from "react-bootstrap";
import axios from "axios";
import SubscriberForm from "./SubscriberForm";

import config from '../config';

const API_URL = config.API_URL;

export default class UpdateSubscriberModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            showForm: true,
            title: '',
            isSaving: false,
            isDeleting: false,
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

        this.handleDelete = this.handleDelete.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleAddField = this.handleAddField.bind(this);
        this.handleFieldsChange = this.handleFieldsChange.bind(this);
        this.handleDeleteField = this.handleDeleteField.bind(this);
    }

    /**
     * Close the modal
     */
    handleClose = () => {
        this.setState({
            show: false,
            showForm: true,
            title: '',
            isSaving: false,
            isDeleting: false,
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
            }
        });
        this.props.onClose();
    };

    /**
     * Pass the form data from props to state when onShow is called
     */
    handleShow = () => {
        console.log(this.props.data);

        this.setState({
            formData: this.props.data
        })
    };

    /**
     * Call the save API to save
     */
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

    /**
     * call the delete API
     */
    handleDelete() {
        this.setState({
            isDeleting: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        axios.delete(`${API_URL}/api/subscriber/${this.state.formData.id}`)
            .then((response) => {
                this.setState({
                    isDeleting: false,
                    showForm: false,
                    showSuccessAlert: true,
                    successText: response.data.message,
                });
            })
            .catch((error) => {
                this.setState({
                    isDeleting: false,
                    showErrorAlert: true,
                    errorText: error.response ? error.response.data.message : 'An error occurred',
                });
            })
    }

    /**
     * Primary form value changes
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

    /**
     * handler when values in the fields have changed
     * @param event
     * @param index
     */
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
     * Delete a field
     * @param index
     */
    handleDeleteField(index) {
        // if the field is a saved item call api to delete
        if (this.state.formData.fields[index] && this.state.formData.fields[index].id) {
            axios.delete(`${API_URL}/api/field/${this.state.formData.fields[index].id}`)
                .then((response) => {
                    this.setState({
                        isDeleting: false,
                        showSuccessAlert: true,
                        successText: response.data.message,
                    });
                    this.deleteFieldFromArray(index);
                })
                .catch((error) => {
                    this.setState({
                        isDeleting: false,
                        showErrorAlert: true,
                        errorText: error.response ? error.response.data.message : 'An error occurred',
                    });
                });
        }

        // just delete from the array
        else {
            this.deleteFieldFromArray(index);
        }
    }

    deleteFieldFromArray(index) {
        let fields = this.state.formData.fields;
        fields.splice(index, 1);

        this.setState({
            ...this.state.formData,
            fields: [
                ...fields
            ]
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
            <Modal show={this.props.show} onShow={this.handleShow} onHide={this.handleClose}>
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
                    {this.state.showForm &&
                    <SubscriberForm
                        data={this.state.formData}
                        onChange={this.handleFormChange}
                        onChangeField={this.handleFieldsChange}
                        onAddField={this.handleAddField}
                        onDeleteField={this.handleDeleteField}
                    />
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    {this.state.isDeleting ?
                        <Button variant="danger" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> Deleting
                        </Button> :
                        <Button variant="danger" onClick={this.handleDelete}>
                            Delete
                        </Button>
                    }
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