import React, {Component, useState} from 'react';
import {Table, Button} from "react-bootstrap";
import axios from 'axios';

import CreateSubscriberModal from "./CreateSubscriberModal";
import UpdateSubscriberModal from "./UpdateSubscriberModal";

import config from '../config';
const API_URL = config.API_URL;

export default class SubscriberList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isLoading: false,
            subscribers: [],
        };

        this.handleShowAddSubscriber = this.handleShowAddSubscriber.bind(this);
    }

    componentDidMount() {
        // fetch data here
        axios.get(`${API_URL}/api/subscriber`)
            .then(response => {
                this.setState({
                    subscribers: response.data.data,
                    isLoaded: true,
                    showAddSubscriberModal: false,
                    showEditSubscriberModal: false,
                });
            })
            .catch(error => console.log(error));
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
    };

    handleCloseEditSubscriber = () => {
        this.setState({showEditSubscriberModal: false});
    };

    render() {
        const {subscribers} = this.state;

        return (
            <div>
                <CreateSubscriberModal
                    title="Add new subscriber"
                    show={this.state.showAddSubscriberModal}
                    data={this.state.formData}
                    onClose={this.handleCloseAddSubscriber} />
                <UpdateSubscriberModal
                    title="Edit subscriber"
                    show={this.state.showEditSubscriberModal}
                    data={this.state.formData}
                    onClose={this.handleCloseEditSubscriber} />
                <div className="text-right offset-lg-2 col-lg-8 p-3">
                    <Button className="" onClick={this.handleShowAddSubscriber}>Add subscriber</Button>
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
                    {subscribers.map && subscribers.map(item => (
                        <tr key={item.id} onClick={() => this.handleShowEditSubscriber(item)}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.state}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}