import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


//import InputField from './InputField'

import '../LogIn.css'

class LogIn extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (event) => {
        const eventid = event.target.name;
        const value = event.target.value;
        this.setState({ [eventid]:value });
    }

    handleSubmit = () => {
        // your submit logic
    }

    render(){
        const { email } = this.state;
        const { password } = this.state;
        return (
            <div className="logInScreen">
                <div className="formContainer">
                    <ValidatorForm
                        ref="form"
                        className="logInForm"
                        onSubmit={this.handleSubmit}
                        onError={errors => console.log(errors)}
                    >
                        <div>
                            <TextValidator
                                id="user-email"
                                label="Email"
                                name="email"
                                className="logInInput"
                                margin="normal"
                                variant="filled"

                                onChange={this.handleChange}
                                value={email}
                                validators={['required', 'isEmail']}
                                errorMessages={['This field is required.', 'Email is not valid.']}
                            />
                        </div>

                        <div>
                            <TextField
                                id="user-password"
                                label="Password"
                                name="password"
                                className="logInInput"
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                variant="filled"

                                value={password}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div>
                        <Button type="submit" className="logInButt">
                            Log In
                        </Button>

                        <Button className="logInButt">
                            Sign up
                        </Button>
                        </div>   
                        
                    </ValidatorForm>
                </div>
            </div>
        )
    }
}
export default LogIn