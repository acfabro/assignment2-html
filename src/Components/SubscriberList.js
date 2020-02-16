import React, {Component, useState} from 'react';
import {Table, Button, Spinner, Modal} from "react-bootstrap";
import axios from 'axios';

import CreateSubscriberModal from "./CreateSubscriberModal";
import UpdateSubscriberModal from "./UpdateSubscriberModal";

import config from '../config';

const API_URL = config.API_URL;

export default class SubscriberList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            subscribers: [],
        };

        this.handleShowAddSubscriber = this.handleShowAddSubscriber.bind(this);
    }

    componentDidMount() {
        this.serviceFetchData();
    }

    handleShowAddSubscriber = () => {
        this.setState({
            showAddSubscriberModal: true,
        });
    };

    handleShowEditSubscriber = (item) => {
        this.setState({
            formData: item,
            showEditSubscriberModal: true,
        });
    };

    handleCloseAddSubscriber = () => {
        this.setState({showAddSubscriberModal: false});
        this.serviceFetchData();
    };

    handleCloseEditSubscriber = () => {
        this.setState({showEditSubscriberModal: false});
        this.serviceFetchData();
    };

    serviceFetchData() {
        this.setState({
            isLoading: true,
        });

        // fetch data here
        axios.get(`${API_URL}/api/subscriber`)
            .then(response => {
                this.setState({
                    subscribers: response.data.data,
                    isLoading: false,
                    showAddSubscriberModal: false,
                    showEditSubscriberModal: false,
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        const {subscribers} = this.state;

        return (
            <div>
                <CreateSubscriberModal
                    title="Add new subscriber"
                    show={this.state.showAddSubscriberModal}
                    data={this.state.formData}
                    onClose={this.handleCloseAddSubscriber}/>
                <UpdateSubscriberModal
                    title="Edit subscriber"
                    show={this.state.showEditSubscriberModal}
                    data={this.state.formData}
                    onClose={this.handleCloseEditSubscriber}/>
                <div className="text-right offset-lg-2 col-lg-8 p-3">
                    {this.state.isLoading ?
                        <Button variant="primary" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> Loading
                        </Button> :
                        <Button className="" onClick={this.handleShowAddSubscriber}>Add subscriber</Button>
                    }
                </div>
                <Table className="subscriber-list-table rounded-lg table-hover offset-lg-2 col-lg-8">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>State</th>
                    </tr>
                    </thead>

                    <tbody>
                    {subscribers.length ? subscribers.map(item => (
                        <tr key={item.id} onClick={() => this.handleShowEditSubscriber(item)}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.state}</td>
                        </tr>
                    )) :
                        <tr>
                            <td colSpan="5">There's nothing here yet. Go click "<strong>Add Subscriber</strong>"</td>
                        </tr>
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
}