import React from 'react'
import LogIn from './../components/LogIn'

class User extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
            <LogIn/>
            </div>

        )
    }
}

export default User