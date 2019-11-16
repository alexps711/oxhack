import React from 'react'
import Typography from '@material-ui/core/Typography/Typography';
import { useParams} from "react-router";
import './Client.css';

export default function Client(props) {
    let {id} = useParams();
    return (
        <div className="container">
            <div className="header">
                <img className="image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png" />
                <Typography>
                    {id}
                </Typography>
            </div>
            <div className="body">

            </div>
        </div>
    );
}


