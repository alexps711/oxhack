import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography/Typography';
import { useParams } from "react-router";
import './Client.css';
import firebase from '../../firebase';
import Card from '../../components/Card';

class Client extends React.Component {
    state = {
        sections: [],
    }

    componentDidMount() {
        let url = window.location.href;
        let userid = url.split("/")[4];
        let clientid = url.split("/")[5];

        this.getSections(userid, clientid)
    }

    getSections = (userid, clientid) => {
        let ref = firebase.database().ref(`users/${userid}/clients/${clientid}/sections`);
        let dbSections = [];
        ref.once('value', (snapshot) => {
            snapshot.forEach(childSnapshot => {
                const tmp = childSnapshot.val();

                dbSections.push(tmp);
            });
            alert(dbSections)
            this.setState({ sections: dbSections });
        });
    }

    render() {
        const {sections} = this.state;
        return (
            <div className="container" >
                <div className="header">
                    <img alt="" className="image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png" />
                </div>
                <div className="body">
                    {console.log(sections)}
                    {sections.map(section => (<div className="Card"><Card title={section.description}/></div>))}
                </div>
            </div>
        );
    }
}

export default Client



