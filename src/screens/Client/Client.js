import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography/Typography';
import { useParams } from "react-router";
import './Client.css';
import firebase from '../../firebase';

export default function Client() {
    let {userid, clientid} = useParams();

    const getSections = () => {
        let ref = firebase.database().ref(`users/${userid}/clients/${clientid}/sections`);
        let dbSections = ["hello"];
        ref.on('value', (snapshot) => {
            snapshot.forEach(childSnapshot => {
                dbSections = [...dbSections, childSnapshot.val()];
            });
        });
        return dbSections;
    }
    const [sections, setSections] = useState(getSections());
    
    return (
        <div className="container"> 
            <div className="header">
                <img alt="" className="image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png" />
            </div>
            <div className="body">

            </div>
        </div>
    );
}


