import React from 'react'
import UserCol from '../components/UserCol'
import '../firebase';


class User extends React.Component {

    render() {
        return (
            <div style={{display:"flex"}}>
                <UserCol title="Clients" id="clients" hidden={false}/> 
                <UserCol title="Group"  id="groups" hidden={true}/> 
                <UserCol title="Cards"  id="cards" hidden={true}/> 
            </div>
        )
    }
}

export default User