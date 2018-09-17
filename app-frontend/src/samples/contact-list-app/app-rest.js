import React, { Component } from 'react';
import axios from 'axios';
import ContactList from './contact-list';

class AppRest extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contacts: []
        }
        //apiHostUrl as global defined in webpack.common
        this.apiHostUrl = process.env.apiHost;
        
    }

    // First function that will render when this Component renders
    // Using axios to make the get in the API(Json-Server)
    componentDidMount() {
        axios
        .get(`${this.apiHostUrl}/tasks`)
        .then(response => {
           
            // Create an array of contacts only with relevant data
            const newContacts = response.data.mockTasks.map(c => {
                return {
                    id: c.id,
                    name: c.first_name,
                    email: c.email
                };
            });

            // Store the new state object in the component's state
            this.setState({contacts: newContacts});
        })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <ContactList contacts={this.state.contacts} />
        );
    }
}

export default AppRest;