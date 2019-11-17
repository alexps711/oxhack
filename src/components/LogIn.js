import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


import firebase from '../firebase';

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
    
    handleSubmit = (event) => {
        var currentThis = this
        event.preventDefault();
        firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password).then(function(user){
            currentThis.props.onSubmit(user)

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)            
        });
    }

    // handleGoogleLogIn

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
                        <Typography variant="h6">
                            Log In
                        </Typography>
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
                        <Button type="submit" className="logInButt" >
                            Log In
                        </Button>

                        {/* <button class="googleBtn" type="button">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="logo"
                            />
                            Login With Google
                        </button> */}

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