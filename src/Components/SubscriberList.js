import React, {Component, useState} from 'react';
import {Table, Button} from "react-bootstrap";
import axios from 'axios';

import config from '../config';
import CreateSubscriberModal from "./CreateSubscriberModal";
import UpdateSubscriberModal from "./UpdateSubscriberModal";

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
            showEditSubscriberModal: true,
        });
    };

    handleCloseAddSubscriber = () => {
        this.setState({showAddSubscriberModal: false});
    };

    handleCloseEditSubscriber = () => {
        this.setState({showEditSubscriberModal: false});
    };

    handleDeleteClicked = item => {
        const newArray = this.state.subscribers.filter(row => row.id !== item.id);
        this.setState({subscribers: newArray});
    };

    handleEditClicked = item => {
        console.log('Edit', item);
    };

    render() {
        const {subscribers} = this.state;

        return (
            <div>
                <CreateSubscriberModal
                    title="Add new subscriber"
                    show={this.state.showAddSubscriberModal}
                    onClose={this.handleCloseAddSubscriber} />
                <UpdateSubscriberModal
                    title="Edit subscriber"
                    show={this.state.showEditSubscriberModal}
                    onClose={this.handleCloseEditSubscriber} />
                <Button className="m-3" onClick={this.handleShowAddSubscriber}>Add subscriber</Button>
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