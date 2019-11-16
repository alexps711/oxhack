import React from 'react'
import ClientHeader from './../../components/ClientHeader'
import './Client.css'
class Client extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="container">
            <ClientHeader/>
            </div>

        )
    }
}

export default Client