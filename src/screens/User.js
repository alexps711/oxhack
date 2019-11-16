import React from 'react'
import UserCol from '../components/UserCol'
import '../firebase';


class User extends React.Component {

    render() {
        return (
            <div style={{display:"flex"}}>
                <UserCol title="Clients" hidden={false}/> 
                <UserCol title="Group"  hidden={true}/> 
                <UserCol title="Cards"  hidden={true}/> 
            </div>
        )
    }
}

export default User